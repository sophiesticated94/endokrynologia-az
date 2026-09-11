import type { ClinicalCase } from './cases.ts';
import { adrenalCasesPart1 } from './cases-adrenals-1.ts';
import { adrenalCasesPart2 } from './cases-adrenals-2.ts';

export const adrenalCases: ClinicalCase[] = [
  ...adrenalCasesPart1,
  ...adrenalCasesPart2,
];
