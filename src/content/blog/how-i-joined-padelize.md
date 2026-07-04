---
title: "I came to audit the code, I left as the CTO"
description: "A technical audit turned into a rebuild: one giant script, broken geometry, a custom keypoint model, and a fractional CTO role."
pubDate: 2026-06-28
tags: ["computer-vision", "padel", "data-centric-ai"]
draft: false
---

Padelize first came to LeftFields for a technical audit.

The request was normal enough: look at the code, figure out why the product was not working, and explain what needed to change.

I expected a messy codebase. Most early products are messy. That is fine. Mess is not the problem. You can clean up mess.

What I found was different.

Most of the AI pipeline lived in one massive Python file of roughly 4000 lines. Field detection, player detection, tracking, projection, model loading, debugging utilities, video handling, everything. There were multiple ways to load the same `.pt` models. Some parts looked like they came from one tutorial, other parts from another tutorial, and none of it seemed designed around the actual geometry of a padel court.

The problem was not that the code needed refactoring.

The problem was that the code had the wrong idea of the product.

## The field looked detected, but the geometry was wrong

The first big problem was field detection.

Padelize does not just need to know "there is a court in this image." It needs to know where the court is in a way that can be used later. If you want to project players onto a top-down court, measure positions, or reason about movement, you need a mapping from camera pixels to real court coordinates.

That mapping is called a homography. It depends on stable geometric points: corners, line intersections, and the structure of the court.

The old system tried to get there with segmentation. It asked a model to color in the court area.

At first glance, that feels reasonable. If the model can segment the court, surely you can use that to understand the court.

But this is where the problem started. A segmentation mask can look good to a human and still be useless for geometry.

Sometimes the full court was not visible. Sometimes the camera only saw part of the playing area. Sometimes the visible court looked like a trapezoid. Sometimes the glass, walls, floor color, and camera angle made the mask look plausible while the shape implied by the mask had nothing to do with the real court.

So you ended up with outputs that looked impressive in isolation: nice colored blobs over the court. But when you tried to turn that blob into a homography, the mapping was wrong. Players projected to impossible positions. Distances made no sense. The downstream system was forced to build on geometry that was already broken.

That was the core issue. The model was optimizing for something visually pleasing, while the product needed something geometrically useful.

![example of a segmentation mask that looks good but gives a bad homography](/images/blog/how-i-became-CTO/projection-problem.jpeg)

## Tracking was built on sand

The player detection and tracking had the same problem.

There was a simple tracker with what was called ReID, but it was not really ReID in the way people usually mean it. It mostly projected detections through the homography and matched the closest one.

That only works if the homography is stable, the detections are clean, and the scene is easy.

Padel is not that scene.

The background is often blue. Players often wear the same basic colors. White shirts, dark shorts, similar silhouettes, fast movement, occlusions, reflections on glass. If you rely on weak appearance cues and a bad court projection, the tracker falls apart quickly.

And once tracking falls apart, everything downstream becomes suspicious. Player positions, rally analysis, movement patterns, all of it depends on identities staying stable for more than a few frames.

The annoying part was that each failure looked like a local bug. A bad detection here. A wrong match there. A weird projection somewhere else.

But the real failure was the pipeline design.

## You cannot patch the wrong abstraction

At some point during the audit, it became clear that fixing individual bugs would be slower than rebuilding the core.

Not because rewriting code is fun. It usually is not. Rewrites are risky, and people underestimate them all the time.

But this was not a normal rewrite. The detector and tracker were not almost right with a few bad edges. They were solving the wrong versions of the problem.

The field detector was trying to produce a nice-looking mask when the product needed stable geometry. The tracker was trying to recover player identity from weak projection and appearance cues when the scene needed padel-specific motion, court constraints, and better player representation. Patching either one would not really be patching. It would mean slowly replacing the method while pretending the old system still existed.

The code structure made that even worse. The existing system had no clean boundaries. There was no obvious place where field detection ended and geometry started. No single model-loading path. No clear data loop. No way to debug a failure without stepping through a giant script and hoping the right print statement was still there.

So the choice was not "rewrite or patch." The choice was "rewrite honestly now, or rewrite accidentally over the next six months while adding more guardrails to the wrong thing."

So I told them the uncomfortable thing: this should not be patched. It should be rebuilt.

They asked if I could do it.

I said yes.

## The rebuild

The first change was mental: stop treating field detection as "find the court mask" and start treating it as "recover usable court geometry."

That changes what you label. It changes what failure means. It changes how you evaluate the model. It changes the whole pipeline.

I rebuilt the core around a few boring rules:

- every stage should have one job
- model inputs and outputs should be obvious
- geometry should be explicit
- failures should be inspectable
- data mistakes should flow back into labeling

The field-detection pipeline became tied to the homography problem instead of being a pretty mask generator. Player projection started depending on a more stable court estimate. Tracking became something you could reason about instead of a pile of heuristics reacting to bad upstream data.

The main fix was a custom keypoint-detection model for the court.

Instead of asking a segmentation model to color in the field, we trained a model to find the points that actually matter for geometry: the corners, intersections, and structural points needed to recover the court. Those points are much closer to what the product needs. A homography does not care that you have a beautiful mask. It cares that the points describe the real court.

To make that work, we had to collect better data. Not in the nice theoretical way where you download a dataset and pretend it matches production. We went outside for a day and visited about 10 padel clubs in the area, recording courts from different angles, different camera positions, different surroundings, different lighting, and different levels of visual chaos.

That field trip mattered. The model needed to see the kind of weirdness the product would actually face: courts partly outside the frame, glass reflections, busy backgrounds, unusual camera placements, and points hidden behind players or occluded by the court structure.

We also created synthetic data for cases we could not easily capture around us. Different court colors, stranger camera angles, harder occlusions, cleaner keypoint labels, and scenarios that would be rare or annoying to collect manually. We tried AI image models for this, mainly Grok and Gemini. Gemini gave much better results. The real footage gave us production texture; the synthetic data let us stretch the distribution on purpose.

![synthetic court keypoint example](/images/blog/how-i-became-CTO/syntetic-data-example.jpeg)
_The useful target was not a pretty court mask. It was the geometry: the keypoints needed to reconstruct the court._

The resulting field-detection system became much more robust because it did not require every point to be visible. If some keypoints were missing or occluded, the rest of the detections could still constrain the court, and the missing points could be extrapolated from the geometry. That is a very different failure mode from a segmentation mask that looks plausible but gives you a nonsense mapping.

![early working keypoint-based field detection](/images/blog/how-i-became-CTO/early-good-example.png)
_An early version of the keypoint-based approach: not polished yet, but already optimizing for the right thing._

![current keypoint-based field detection result](/images/blog/how-i-became-CTO/good-current-example.png)
_The current version: cleaner court geometry, more stable projection, and a much better foundation for everything downstream._

The pipeline became much easier to reason about too. Roughly, it turned into this:

```python
for i, frame in enumerate(video):
    if i % 10 == 0:
        court_points = field_detector(frame)
        homography = projector.create_homography(court_points)
        player_tracker.set_court_homography(homography)

    players = player_detector(frame)
    ball = ball_tracker(frame)

    stats.update(players, ball, homography)
    highlights.update(stats)

    render_debug_view(frame, court_points, players, ball, stats)
```

That is obviously simplified, but the important part is the shape. Field geometry is created first. The tracker knows about that geometry. Player and ball detections feed into stats. Highlight detection sits on top of the game state instead of being another hidden branch inside a giant inference script. Rendering is just rendering, not secretly part of the model pipeline.

This is what was missing before: a pipeline where every part has a place.

Player tracking got the same treatment. We stopped pretending a generic tracker was enough and built something much more specific to padel. The tracker used the court geometry, movement constraints, and padel-specific heuristics instead of relying on weak appearance matching in a scene where everyone looks similar and the background barely changes.

This is also where more of the real product work moved. The long-term direction is not to keep adding tracker guardrails forever. We started moving toward a temporal person-detection model that also tracks the player. Instead of detecting a plain bounding box and asking a separate tracker to guess identity after the fact, the model produces a more stable representation of the person over time.

A rectangle around a person is a very lossy object: it tells you roughly where someone is, but not much about their body geometry or movement. The newer temporal person model gives the system actual player geometry, which is a much better starting point for tracking than chasing boxes frame to frame.

![temporal person detection with player geometry](/images/blog/how-i-became-CTO/person-tracking.gif)
_A newer temporal person-detection model: more player geometry, less plain bounding-box chasing._

This is the pattern I kept coming back to: make the model predict the thing the product actually needs, then make the rest of the system honest about uncertainty. If a point is hidden, say it is hidden and infer it from the structure. If a player is occluded, handle that as part of the tracker instead of hoping ReID magically solves it.

I also cleaned up the model-loading mess. One way to load a model. One way to run inference. One place to understand what the pipeline is doing.

That sounds basic, but basic is exactly what was missing.

## What changed

After about a month, the field-detection pipeline reached 90% accuracy and ran at 2.4x real-time speed.

The number is nice, but the bigger change was that the system became understandable.

When field detection failed, we could inspect the failure. When projection looked wrong, we could trace it back to geometry. When tracking broke, we could see whether the issue came from detections, homography, or the tracker itself.

The rebuilt flow also made product features possible in a cleaner way. Once the system had stable court geometry, player state, ball detections, and game stats, highlight detection became something that could sit on top of the pipeline instead of another hack inside it.

That is the difference between a demo and a product. A demo only has to work once. A product has to fail in ways you can debug.

## Why I joined

After the rebuild, Padelize asked me to join full-time.

At first, the owner wanted a bigger equity split if I joined fully. I also did not want to leave LeftFields. I like the variety of client work, and I did not want to trade that away for one product full-time. So we ended up with a structure that fit both sides: I became fractional CTO with 10% ownership.

Now I own the technical direction: the mobile app, cloud infrastructure, computer-vision stack, deployment pipeline, data quality, and the loop from model failures back into labeling.

The funny thing is that the work still feels like the audit. The interesting part is not writing code for the sake of writing code. It is figuring out what the actual problem is.

In this case, the problem was never "make the segmentation model better."

The problem was: build a system that understands a court well enough for the rest of the product to trust it.

Once that was clear, the rebuild made sense.
