import type { ParathyroidCaseDraft } from './cases-parathyroid-types.ts';
import { parathyroidCasesPart1 } from './cases-parathyroid-1.ts';
import { parathyroidCasesPart2 } from './cases-parathyroid-2.ts';
import { parathyroidCasesPart3 } from './cases-parathyroid-3.ts';

export type { ParathyroidCaseDraft };

export const parathyroidCases: ParathyroidCaseDraft[] = [
  ...parathyroidCasesPart1,
  ...parathyroidCasesPart2,
  ...parathyroidCasesPart3,
];
