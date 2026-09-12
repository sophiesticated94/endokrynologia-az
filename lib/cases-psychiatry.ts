import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { make, makeFlexibleCase } from './cases-psychiatry-builder.ts';
import { psychiatryCasesPart1 } from './cases-psychiatry-1.ts';
import { psychiatryCasesPart1b } from './cases-psychiatry-1b.ts';
import { psychiatryCasesPart2 } from './cases-psychiatry-2.ts';
import { psychiatryCasesPart2b } from './cases-psychiatry-2b.ts';
import { psychiatryCasesPart3 } from './cases-psychiatry-3.ts';
import { psychiatryCasesPart3b } from './cases-psychiatry-3b.ts';

export type { ClinicalCase };
export { make, makeFlexibleCase };

export const psychiatryCases: ClinicalCase[] = [
  ...psychiatryCasesPart1,
  ...psychiatryCasesPart1b,
  ...psychiatryCasesPart2,
  ...psychiatryCasesPart2b,
  ...psychiatryCasesPart3,
  ...psychiatryCasesPart3b,
];

