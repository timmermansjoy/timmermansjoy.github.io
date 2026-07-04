import type { ProjectItem } from './types';

export const projects: ProjectItem[] = [
  {
    name: 'Self-Driving Bot',
    tag: 'Robotics & Optimisation',
    description:
      'Built a ROS-based autonomous robot using neural networks for lateral control, sensor processing, real-time inference, and path optimisation. Earned the first perfect score, 20/20, in the course history.',
    href: 'https://github.com/timmermansjoy/Turtlebot',
    image: '/images/turtlebot.jpg',
    imageAlt: 'The self-driving Turtlebot',
  },
  {
    name: 'Chess Assistant',
    tag: 'Computer Vision',
    description:
      'Built a computer-vision system that recognises chessboard states and recommends moves through a self-developed chess engine.',
    href: 'https://github.com/timmermansjoy/Chess-assistant',
  },
];
