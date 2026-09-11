import type { NenCaseDraft } from './cases-nen-types.ts';
import { nenCasesPart1 } from './cases-nen-1.ts';
import { nenCasesPart2 } from './cases-nen-2.ts';

export const nenCases: NenCaseDraft[] = [
  ...nenCasesPart1,
  ...nenCasesPart2,
];
