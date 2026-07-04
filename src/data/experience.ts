import type { ExperienceRole } from './types';

export const experience: ExperienceRole[] = [
  {
    company: 'LeftFields',
    location: 'Hasselt, Belgium',
    title: 'AI Engineer',
    period: 'February 2026 — Present',
    startYear: 2026,
    narrative:
      'AI engineering across client engagements — from dataset infrastructure to secure edge deployment.',
    clients: [
      {
        name: 'Rematics',
        href: 'https://www.rematics.be/',
        narrative:
          'Built source-to-data-lake workflows that cut dataset preparation from weeks to hours, and used a hardware security chip to create a fully unsupervised provisioning system — eliminating 30–40 minutes of manual setup per device and saving roughly 8,000 hours a year in manual work. Hardened deployment across Yocto-based operating systems and NVIDIA DeepStream pipelines.',
      },
      {
        name: 'Daymaker',
        href: 'https://daymaker.travel/en',
        narrative:
          'Designed and shipped an analytics dashboard covering traffic, product usage, and behavioural flows — turning scattered product data into reporting views that drove day-to-day product and operational decisions.',
      },
      {
        name: 'RapidFit',
        href: 'https://rapidfit.com/',
        narrative:
          'Did a full company wide technology audit to help optimise their engineering and buisness processes, then proposed changes that cut selected turnaround times by up to 60%.',
      },
    ],
  },
  {
    company: 'Padelize',
    location: 'Hasselt, Belgium',
    title: 'Fractional CTO',
    period: 'July 2026 — Present',
    startYear: 2026,
    narrative:
      'Started with a technical audit through LeftFields, then rebuilt the unusable core system in about a month and joined as fractional CTO with 10% ownership. Own the architecture and technical direction across the mobile app, cloud infrastructure, AI services, and deployment pipeline. Lead the computer-vision work: temporal models, field detection, tracking, homography-based player projection, annotation standards, dataset review, and the feedback loop from model failures back into labelling and training.',
  },
  {
    company: 'Secury360',
    location: 'Zonhoven, Belgium',
    title: 'Machine Learning Engineer',
    period: 'August 2022 — February 2026',
    startYear: 2022,
    narrative:
      'Built and maintained the computer-vision data platform on FiftyOne for multi-million-sample datasets. Applied data-centric AI to cut false positives by 30%, then developed a temporal preprocessing method that pushed the false-positive rate down a further 40% while improving accuracy. Shipped Azure-based AI filtering that lowered monthly cloud costs by 15%, and owned the Linux-based edge-device software in production.',
  },
  {
    company: 'PXL Research',
    location: 'Hasselt, Belgium',
    title: 'Intern Researcher — Time Series & Edge AI',
    period: 'February 2022 — July 2022',
    startYear: 2022,
    narrative:
      'Industrial energy-optimisation research. Built multivariate time-series models that forecast 24-hour power consumption with 85% accuracy, and evaluated the edge-deployment constraints of running it in real time on sensor data.',
  },
  {
    company: 'PXL Smart-ICT',
    location: 'Hasselt, Belgium',
    title: 'React Native Developer',
    period: 'July 2020 — May 2021',
    startYear: 2020,
    narrative:
      'Built a React Native application that streamlined communication between healthcare institutions and workers.',
  },
  {
    company: 'NYBE',
    location: 'Hasselt, Belgium',
    title: 'Junior Developer',
    period: 'May 2022 — July 2022',
    startYear: 2022,
    narrative:
      'Contributed to scalable Laravel applications and production web-development workflows.',
  },
];
