export interface ImpactMetric {
  /** numeric target (use 0 for non-numeric like × symbols handled in `suffix`) */
  value: number;
  /** decimals to display */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
}

export const impact: ImpactMetric[] = [
  {
    value: 30,
    suffix: '%',
    label: 'False-positive reduction',
    context: 'Data-centric AI @ Secury360',
  },
  {
    value: 2.5,
    decimals: 1,
    suffix: '×',
    label: 'Real-time inference speed',
    context: 'field-detection pipeline @ Padelize',
  },
  {
    value: 15,
    suffix: '%',
    label: 'Cloud cost reduction',
    context: 'Azure-based AI filtering logic @ Secury360',
  },
  {
    value: 8000,
    suffix: '+',
    label: 'Hours saved per year',
    context: 'Unsupervised device provisioning @ Rematics',
  },
  {
    value: 90,
    suffix: '%',
    label: 'Field-detection accuracy',
    context: 'Complete rewrite @ Padelize',
  },
  {
    value: 60,
    suffix: '%',
    label: 'Process turnaround cut',
    context: 'quotation flow redesign @ RapidFit',
  },
];
