import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  text,
  integer,
  bigint,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const revisionStatusEnum = pgEnum('revision_status', [
  'draft',
  'review',
  'published',
  'archived',
]);

export const courses = pgTable('courses', {
  id: varchar('id', { length: 64 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  version: varchar('version', { length: 64 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const modules = pgTable('modules', {
  id: varchar('id', { length: 64 }).primaryKey(),
  courseId: varchar('course_id', { length: 64 })
    .notNull()
    .references(() => courses.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: text('subtitle'),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const lessons = pgTable('lessons', {
  id: varchar('id', { length: 64 }).primaryKey(),
  moduleId: varchar('module_id', { length: 64 })
    .notNull()
    .references(() => modules.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: text('subtitle'),
  sortOrder: integer('sort_order').default(0).notNull(),
  minutes: integer('minutes').default(12).notNull(),
  publishedRevisionId: uuid('published_revision_id').references(
    (): AnyPgColumn => lessonRevisions.id,
    { onDelete: 'set null' }
  ),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const lessonRevisions = pgTable(
  'lesson_revisions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    lessonId: varchar('lesson_id', { length: 64 })
      .notNull()
      .references(() => lessons.id, { onDelete: 'cascade' }),
    version: integer('version').notNull(),
    contentHash: varchar('content_hash', { length: 64 }).notNull(),
    document: jsonb('document').notNull(),
    status: revisionStatusEnum('status').default('published').notNull(),
    sourceCommitSha: varchar('source_commit_sha', { length: 64 }),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    changeSummary: text('change_summary'),
    reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
    reviewedBy: varchar('reviewed_by', { length: 128 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('lesson_version_idx').on(table.lessonId, table.version),
    index('lesson_content_hash_idx').on(table.contentHash),
  ]
);

export const contentAssets = pgTable(
  'content_assets',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    objectKey: varchar('object_key', { length: 512 }).notNull().unique(),
    sha256: varchar('sha256', { length: 64 }).notNull(),
    mimeType: varchar('mime_type', { length: 128 }).notNull(),
    byteSize: bigint('byte_size', { mode: 'number' }).notNull(),
    width: integer('width'),
    height: integer('height'),
    altText: text('alt_text'),
    caption: text('caption'),
    attribution: text('attribution'),
    license: text('license'),
    originalFilename: text('original_filename'),
    metadata: jsonb('metadata').default({}).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('asset_sha256_idx').on(table.sha256),
  ]
);

export const widgetPresets = pgTable('widget_presets', {
  id: varchar('id', { length: 128 }).primaryKey(),
  widgetKind: varchar('widget_kind', { length: 64 }).notNull(),
  moduleId: varchar('module_id', { length: 64 }).references(() => modules.id, {
    onDelete: 'set null',
  }),
  lessonId: varchar('lesson_id', { length: 64 }).references(() => lessons.id, {
    onDelete: 'set null',
  }),
  title: varchar('title', { length: 255 }).notNull(),
  initialState: jsonb('initial_state').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const contentSources = pgTable('content_sources', {
  id: varchar('id', { length: 128 }).primaryKey(),
  title: text('title').notNull(),
  year: varchar('year', { length: 32 }),
  url: text('url'),
  kind: varchar('kind', { length: 128 }),
  doi: varchar('doi', { length: 128 }),
  authors: text('authors'),
  pmid: varchar('pmid', { length: 32 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const evidenceClaims = pgTable('evidence_claims', {
  id: varchar('id', { length: 128 }).primaryKey(),
  sourceId: varchar('source_id', { length: 128 })
    .notNull()
    .references(() => contentSources.id, { onDelete: 'cascade' }),
  statement: text('statement').notNull(),
  quote: text('quote'),
  confidence: varchar('confidence', { length: 32 }),
  category: varchar('category', { length: 64 }),
  strength: varchar('strength', { length: 64 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// Relations
export const coursesRelations = relations(courses, ({ many }) => ({
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, { fields: [modules.courseId], references: [courses.id] }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, { fields: [lessons.moduleId], references: [modules.id] }),
  revisions: many(lessonRevisions),
}));

export const lessonRevisionsRelations = relations(lessonRevisions, ({ one }) => ({
  lesson: one(lessons, { fields: [lessonRevisions.lessonId], references: [lessons.id] }),
}));

export const contentSourcesRelations = relations(contentSources, ({ many }) => ({
  evidenceClaims: many(evidenceClaims),
}));
