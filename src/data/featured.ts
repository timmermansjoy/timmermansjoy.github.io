export interface FeaturedMetric {
  value: string;
  label: string;
}

export interface Featured {
  kicker: string;
  title: string;
  body: string[];
  metrics: FeaturedMetric[];
  image?: string;
  imageAlt?: string;
}

export const featured: Featured = {
  kicker: 'Currently building',
  title: 'Padelize',
  body: [
    "I first met Padelize through my work at LeftFields. What started as a small technical audit turned into a much bigger conversation: the implementation they had paid for over the previous year had no real foundation. It was hard to run, hard to trust, and not something you could sensibly build a product on.",
    "I rebuilt the core system in about a month by going back to first principles instead of stacking tutorial code on top of tutorial code. Field detection, temporal modelling, player projection, cloud pieces, deployment, and the data loop all became simpler, more stable, and much easier to reason about.",
    "After that, Padelize asked me to join. I did not want to leave LeftFields, so we made it work another way: I became fractional CTO with 10% ownership, responsible for the technical direction and the computer-vision system behind the product.",
  ],
  metrics: [
    { value: '1 month', label: 'core rebuild' },
    { value: '10%', label: 'ownership' },
    { value: '90%', label: 'field-detection accuracy' },
  ],
  image: '/images/padelize.jpg',
  imageAlt: 'Padelize court field-detection visualization',
};
