import type { EducationItem } from './types';

export const education: EducationItem[] = [
  {
    school: 'Woolf University',
    location: 'Remote',
    degree: 'Master of Science in Artificial Intelligence',
    period: '2026 — Expected 2027',
    notes: [
      {
        label: 'Coursework',
        value:
          'Machine Learning, Deep Learning, Statistics, Data Analytics, Computer Vision, Generative AI, Agentic AI, AI Programming, LangChain, MCP, and AI Ethics.',
      },
    ],
  },
  {
    school: 'PXL University of Applied Sciences and Arts',
    location: 'Hasselt, Belgium',
    degree: 'Bachelor of Applied Computer Science — AI & Robotics',
    period: '2019 — 2022',
    notes: [
      { label: 'Honors', value: 'Graduated with Honors' },
      {
        label: 'Relevant coursework',
        value:
          'Machine Learning, Robotics and Path Planning, Big Data, Large Language Models, and Time Series Analysis.',
      },
    ],
  },
];
