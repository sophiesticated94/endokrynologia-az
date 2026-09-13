import { eq, desc } from 'drizzle-orm';
import type { AppDatabase } from '../../db/postgres/index.ts';
import {
  modules,
  lessons,
  lessonRevisions,
} from '../../db/postgres/schema.ts';
import {
  LessonRevisionDocumentSchema,
  type LessonRevisionDocument,
} from './schemas/lesson-revision.ts';
import { compareLessonDocuments } from './structured-diff.ts';
import {
  lessons as endoLessons,
  lessonExperiences as endoExperiences,
  modulesList as endoModules,
} from '../course.ts';
import {
  psychiatryLessons,
  psychiatryModulesList,
} from '../course-psychiatry.ts';
import { psychiatryLessonExperiences } from '../psychiatry/index.ts';

const allStaticLessons = [...endoLessons, ...psychiatryLessons];
const allStaticExperiences = { ...endoExperiences, ...psychiatryLessonExperiences };
const allStaticModules: ModuleSummary[] = [
  ...endoModules.map((m, idx) => ({
    id: m.id,
    courseId: 'endocrinology',
    title: m.name,
    subtitle: m.subtitle,
    sortOrder: idx + 1,
  })),
  ...psychiatryModulesList.map((m, idx) => ({
    id: m.id,
    courseId: 'psychiatry',
    title: m.name,
    subtitle: m.subtitle,
    sortOrder: idx + 1,
  })),
];

export interface ModuleSummary {
  id: string;
  courseId: string;
  title: string;
  subtitle?: string | null;
  sortOrder: number;
}

export interface ContentRepository {
  getLesson(lessonId: string): Promise<LessonRevisionDocument | null>;
  listLessons(moduleId: string): Promise<LessonRevisionDocument[]>;
  getModule(moduleId: string): Promise<ModuleSummary | null>;
}

export class StaticContentRepository implements ContentRepository {
  async getLesson(lessonId: string): Promise<LessonRevisionDocument | null> {
    const lesson = allStaticLessons.find((l) => l.id === lessonId);
    if (!lesson) return null;

    const experience = allStaticExperiences[lessonId];
    const doc: LessonRevisionDocument = {
      id: lesson.id,
      moduleId: lesson.moduleId || 'tarczyca',
      title: lesson.title,
      subtitle: lesson.subtitle || lesson.title,
      group: lesson.group,
      minutes: lesson.minutes,
      goals: lesson.goals,
      sections: lesson.sections,
      table: lesson.table,
      advanced: lesson.advanced,
      summary: lesson.summary,
      sourceIds: lesson.sourceIds,
      questions: lesson.questions,
      experience: experience || undefined,
      derivation: lesson.derivation,
      workedExample: lesson.workedExample,
      assetIds: [],
      review: lesson.review,
    };

    return LessonRevisionDocumentSchema.parse(doc);
  }

  async listLessons(moduleId: string): Promise<LessonRevisionDocument[]> {
    const matched = allStaticLessons.filter((l) => l.moduleId === moduleId);
    const results: LessonRevisionDocument[] = [];
    for (const l of matched) {
      const doc = await this.getLesson(l.id);
      if (doc) results.push(doc);
    }
    return results;
  }

  async getModule(moduleId: string): Promise<ModuleSummary | null> {
    const mod = allStaticModules.find((m) => m.id === moduleId);
    return mod || null;
  }
}

export class PostgresContentRepository implements ContentRepository {
  private readonly db: AppDatabase;

  constructor(db: AppDatabase) {
    this.db = db;
  }

  async getLesson(lessonId: string): Promise<LessonRevisionDocument | null> {
    const rows = await this.db
      .select({
        lesson: lessons,
        revision: lessonRevisions,
      })
      .from(lessons)
      .innerJoin(
        lessonRevisions,
        eq(lessons.publishedRevisionId, lessonRevisions.id)
      )
      .where(eq(lessons.id, lessonId))
      .limit(1);

    if (!rows[0]) {
      return null;
    }

    return LessonRevisionDocumentSchema.parse(rows[0].revision.document);
  }

  async listLessons(moduleId: string): Promise<LessonRevisionDocument[]> {
    const rows = await this.db
      .select({
        lesson: lessons,
        revision: lessonRevisions,
      })
      .from(lessons)
      .innerJoin(
        lessonRevisions,
        eq(lessons.publishedRevisionId, lessonRevisions.id)
      )
      .where(eq(lessons.moduleId, moduleId))
      .orderBy(lessons.sortOrder);

    return rows.map((r) => LessonRevisionDocumentSchema.parse(r.revision.document));
  }

  async getModule(moduleId: string): Promise<ModuleSummary | null> {
    const rows = await this.db
      .select()
      .from(modules)
      .where(eq(modules.id, moduleId))
      .limit(1);

    if (!rows[0]) return null;
    return {
      id: rows[0].id,
      courseId: rows[0].courseId,
      title: rows[0].title,
      subtitle: rows[0].subtitle,
      sortOrder: rows[0].sortOrder,
    };
  }
}

export class ComparingContentRepository implements ContentRepository {
  private readonly staticRepo: StaticContentRepository;
  private readonly pgRepo: PostgresContentRepository;

  constructor(
    staticRepo: StaticContentRepository,
    pgRepo: PostgresContentRepository
  ) {
    this.staticRepo = staticRepo;
    this.pgRepo = pgRepo;
  }

  async getLesson(lessonId: string): Promise<LessonRevisionDocument | null> {
    const [fromStatic, fromPg] = await Promise.all([
      this.staticRepo.getLesson(lessonId),
      this.pgRepo.getLesson(lessonId),
    ]);

    if (!fromPg) {
      throw new Error(`[compare] Lesson "${lessonId}" is missing from PostgreSQL! No silent fallback in compare mode.`);
    }
    if (!fromStatic) {
      console.warn(`[compare] Lesson "${lessonId}" exists in PostgreSQL but not in static definitions.`);
      return fromPg;
    }

    const diff = compareLessonDocuments(fromStatic, fromPg);
    if (!diff.equal) {
      console.warn(
        `[compare] Structured diff mismatch for lesson "${lessonId}" (${diff.differences.length} differences):`,
        diff.differences.map((d) => `${d.path}: ${d.message}`)
      );
    }

    return fromPg;
  }

  async listLessons(moduleId: string): Promise<LessonRevisionDocument[]> {
    const [sList, pgList] = await Promise.all([
      this.staticRepo.listLessons(moduleId),
      this.pgRepo.listLessons(moduleId),
    ]);

    if (sList.length !== pgList.length) {
      console.warn(`[compare] Module ${moduleId} count mismatch: static=${sList.length}, pg=${pgList.length}`);
    }

    return pgList.length > 0 ? pgList : sList;
  }

  async getModule(moduleId: string): Promise<ModuleSummary | null> {
    const fromPg = await this.pgRepo.getModule(moduleId);
    if (fromPg) return fromPg;
    return await this.staticRepo.getModule(moduleId);
  }
}
