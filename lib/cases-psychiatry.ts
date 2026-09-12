import type { ClinicalCase } from './cases-psychiatry-builder.ts';
import { make } from './cases-psychiatry-builder.ts';
import { psychiatryCasesPart1 } from './cases-psychiatry-1.ts';
import { psychiatryCasesPart2 } from './cases-psychiatry-2.ts';

export type { ClinicalCase };
export { make };

export const psychiatryCases: ClinicalCase[] = [
  ...psychiatryCasesPart1,
  ...psychiatryCasesPart2,
];
