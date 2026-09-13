ALTER TABLE "evidence_claims" ADD COLUMN "category" varchar(64);--> statement-breakpoint
ALTER TABLE "evidence_claims" ADD COLUMN "strength" varchar(64);--> statement-breakpoint
ALTER TABLE "lesson_revisions" ADD COLUMN "source_commit_sha" varchar(64);--> statement-breakpoint
ALTER TABLE "lesson_revisions" ADD COLUMN "published_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "lesson_revisions" ADD COLUMN "change_summary" text;--> statement-breakpoint
ALTER TABLE "lesson_revisions" ADD COLUMN "reviewed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "lesson_revisions" ADD COLUMN "reviewed_by" varchar(128);