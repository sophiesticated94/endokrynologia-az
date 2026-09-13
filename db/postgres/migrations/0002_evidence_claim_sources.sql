CREATE TABLE IF NOT EXISTS "evidence_claim_sources" (
	"claim_id" varchar(128) NOT NULL,
	"source_id" varchar(128) NOT NULL,
	CONSTRAINT "evidence_claim_sources_claim_id_source_id_pk" PRIMARY KEY("claim_id","source_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "evidence_claim_sources" ADD CONSTRAINT "evidence_claim_sources_claim_id_evidence_claims_id_fk" FOREIGN KEY ("claim_id") REFERENCES "public"."evidence_claims"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "evidence_claim_sources" ADD CONSTRAINT "evidence_claim_sources_source_id_content_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."content_sources"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "evidence_claim_sources_source_idx" ON "evidence_claim_sources" USING btree ("source_id");
--> statement-breakpoint
DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'evidence_claims' AND column_name = 'source_id') THEN
  INSERT INTO "evidence_claim_sources" ("claim_id", "source_id")
  SELECT "id", "source_id" FROM "evidence_claims"
  WHERE "source_id" IS NOT NULL
  ON CONFLICT DO NOTHING;
 END IF;
END $$;
--> statement-breakpoint
ALTER TABLE "evidence_claims" DROP COLUMN IF EXISTS "source_id";
