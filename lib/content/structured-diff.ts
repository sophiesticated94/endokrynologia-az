import type { LessonRevisionDocument } from './schemas/lesson-revision.ts';

export interface FieldDifference {
  path: string;
  message: string;
  staticValue: unknown;
  dbValue: unknown;
}

export interface StructuredDiffResult {
  equal: boolean;
  differences: FieldDifference[];
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;
  const keysA = Object.keys(objA).filter((k) => objA[k] !== undefined);
  const keysB = Object.keys(objB).filter((k) => objB[k] !== undefined);

  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!deepEqual(objA[k], objB[k])) return false;
  }
  return true;
}

export function compareLessonDocuments(
  staticDoc: LessonRevisionDocument,
  pgDoc: LessonRevisionDocument
): StructuredDiffResult {
  const differences: FieldDifference[] = [];

  const check = (path: string, staticVal: unknown, dbVal: unknown, label?: string) => {
    if (!deepEqual(staticVal, dbVal)) {
      differences.push({
        path,
        message: label || `Mismatch at ${path}`,
        staticValue: staticVal,
        dbValue: dbVal,
      });
    }
  };

  // 1. Core lesson fields
  check('id', staticDoc.id, pgDoc.id);
  check('moduleId', staticDoc.moduleId, pgDoc.moduleId);
  check('title', staticDoc.title, pgDoc.title);
  check('subtitle', staticDoc.subtitle, pgDoc.subtitle);
  check('group', staticDoc.group, pgDoc.group);
  check('minutes', staticDoc.minutes, pgDoc.minutes);
  check('summary', staticDoc.summary, pgDoc.summary);
  check('advanced', staticDoc.advanced, pgDoc.advanced);

  // 2. Goals & Sources
  check('goals', staticDoc.goals, pgDoc.goals, 'Goals mismatch');
  check('sourceIds', staticDoc.sourceIds, pgDoc.sourceIds, 'Source IDs mismatch');

  // 3. Sections
  check('sections.length', staticDoc.sections.length, pgDoc.sections.length);
  const maxSec = Math.max(staticDoc.sections.length, pgDoc.sections.length);
  for (let i = 0; i < maxSec; i++) {
    const sSec = staticDoc.sections[i];
    const pSec = pgDoc.sections[i];
    if (!sSec || !pSec) {
      differences.push({
        path: `sections[${i}]`,
        message: 'Section missing',
        staticValue: sSec,
        dbValue: pSec,
      });
      continue;
    }
    check(`sections[${i}].title`, sSec.title, pSec.title);
    check(`sections[${i}].text`, sSec.text, pSec.text);
  }

  // 4. Table
  check('table.headers', staticDoc.table.headers, pgDoc.table.headers);
  check('table.rows', staticDoc.table.rows, pgDoc.table.rows);

  // 5. Questions and answer indexes
  check('questions.length', staticDoc.questions.length, pgDoc.questions.length);
  const maxQ = Math.max(staticDoc.questions.length, pgDoc.questions.length);
  for (let i = 0; i < maxQ; i++) {
    const sQ = staticDoc.questions[i];
    const pQ = pgDoc.questions[i];
    if (!sQ || !pQ) {
      differences.push({
        path: `questions[${i}]`,
        message: 'Question missing',
        staticValue: sQ,
        dbValue: pQ,
      });
      continue;
    }
    check(`questions[${i}].id`, sQ.id, pQ.id);
    check(`questions[${i}].prompt`, sQ.prompt, pQ.prompt);
    check(`questions[${i}].answer`, sQ.answer, pQ.answer, `Question ${sQ.id} answer index mismatch`);
    check(`questions[${i}].options`, sQ.options, pQ.options);
  }

  // 6. Experience V2 (activities, objectives, widgets, enhancements)
  if (staticDoc.experience || pgDoc.experience) {
    if (!staticDoc.experience || !pgDoc.experience) {
      differences.push({
        path: 'experience',
        message: 'One document lacks experience',
        staticValue: !!staticDoc.experience,
        dbValue: !!pgDoc.experience,
      });
    } else {
      const sExp = staticDoc.experience;
      const pExp = pgDoc.experience;

      check('experience.experienceVersion', sExp.experienceVersion, pExp.experienceVersion);
      check('experience.objectives', sExp.objectives, pExp.objectives);
      check('experience.widgetIds', sExp.widgetIds, pExp.widgetIds);
      check('experience.diagnostic', sExp.diagnostic, pExp.diagnostic);
      check('experience.activities', sExp.activities, pExp.activities);
      check('experience.teachBack', sExp.teachBack, pExp.teachBack);
      check('experience.exitTicket', sExp.exitTicket, pExp.exitTicket);

      // Check blocks and inlineEnhancements
      check('experience.blocks.length', sExp.blocks.length, pExp.blocks.length);
      const maxB = Math.max(sExp.blocks.length, pExp.blocks.length);
      for (let i = 0; i < maxB; i++) {
        const sB = sExp.blocks[i];
        const pB = pExp.blocks[i];
        if (!sB || !pB) continue;
        check(`experience.blocks[${i}].id`, sB.id, pB.id);
        check(`experience.blocks[${i}].title`, sB.title, pB.title);
        check(`experience.blocks[${i}].text`, sB.text, pB.text);
        check(`experience.blocks[${i}].inlineEnhancements`, sB.inlineEnhancements, pB.inlineEnhancements);
      }
    }
  }

  // 7. Derivations and Worked Examples
  check('derivation', staticDoc.derivation, pgDoc.derivation);
  check('workedExample', staticDoc.workedExample, pgDoc.workedExample);

  // 8. Asset references
  check('assetIds', staticDoc.assetIds, pgDoc.assetIds);

  return {
    equal: differences.length === 0,
    differences,
  };
}
