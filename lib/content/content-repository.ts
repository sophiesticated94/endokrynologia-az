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
import { lessons as staticLessons, lessonExperiences as staticExperiences } from '../course.ts';

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
    const lesson = staticLessons.find((l) => l.id === lessonId);
    if (!lesson) return null;

    const experience = staticExperiences[lessonId];
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
    const matched = staticLessons.filter((l) => l.moduleId === moduleId);
    const results: LessonRevisionDocument[] = [];
    for (const l of matched) {
      const doc = await this.getLesson(l.id);
      if (doc) results.push(doc);
    }
    return results;
  }

  async getModule(moduleId: string): Promise<ModuleSummary | null> {
    const l = staticLessons.find((l) => l.moduleId === moduleId);
    if (!l) return null;
    return {
      id: moduleId,
      courseId: 'endocrinology',
      title: moduleId.charAt(0).toUpperCase() + moduleId.slice(1),
      sortOrder: 0,
    };
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
      // Fallback to latest revision if publishedRevisionId is not set
      const latest = await this.db
        .select()
        .from(lessonRevisions)
        .where(eq(lessonRevisions.lessonId, lessonId))
        .orderBy(desc(lessonRevisions.version))
        .limit(1);

      if (!latest[0]) return null;
      return LessonRevisionDocumentSchema.parse(latest[0].document);
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

    if (!fromStatic && !fromPg) return null;
    if (!fromStatic || !fromPg) {
      console.warn(`[compare] Discrepancy for lesson ${lessonId}: static=${!!fromStatic}, pg=${!!fromPg}`);
      return fromPg || fromStatic;
    }

    // Compare essential fields
    const sJson = JSON.stringify(fromStatic);
    const pgJson = JSON.stringify(fromPg);
    if (sJson !== pgJson) {
      console.warn(`[compare] Content mismatch for lesson ${lessonId}`);
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
