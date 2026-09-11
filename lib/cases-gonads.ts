import type { GonadCaseDraft } from './cases-gonads-types.ts';
import { gonadCasesPart1 } from './cases-gonads-1.ts';
import { gonadCasesPart2 } from './cases-gonads-2.ts';

export type { GonadCaseDraft };

export const gonadCases: GonadCaseDraft[] = [
  ...gonadCasesPart1,
  ...gonadCasesPart2,
];
