import type { DiabetesCaseDraft } from './cases-diabetes-types.ts';
import { diabetesCasesPart1 } from './cases-diabetes-1.ts';
import { diabetesCasesPart2 } from './cases-diabetes-2.ts';

export type { DiabetesCaseDraft };

export const diabetesCases: DiabetesCaseDraft[] = [
  ...diabetesCasesPart1,
  ...diabetesCasesPart2,
];
