import type { GonadCaseDraft } from './cases-gonads-types.ts';
import { gonadCasesPart1 } from './cases-gonads-1.ts';
import { gonadCasesPart2 } from './cases-gonads-2.ts';
import { gahtCases } from './cases-gaht.ts';

export type { GonadCaseDraft };

export const gonadCases: GonadCaseDraft[] = [
  ...gonadCasesPart1,
  ...gonadCasesPart2.filter(c=>!['case-gonady-trans-feminizujaca','case-gonady-trans-maskulinizujaca'].includes(c.id)),
  ...gahtCases,
];
