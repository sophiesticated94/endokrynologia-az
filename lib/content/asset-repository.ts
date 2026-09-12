import { eq } from 'drizzle-orm';
import type { AppDatabase } from '../../db/postgres/index.ts';
import { contentAssets } from '../../db/postgres/schema.ts';

export type ContentAssetRecord = typeof contentAssets.$inferSelect;
export type InsertContentAsset = typeof contentAssets.$inferInsert;

export class ContentAssetRepository {
  private readonly db: AppDatabase;

  constructor(db: AppDatabase) {
    this.db = db;
  }

  async findById(id: string): Promise<ContentAssetRecord | null> {
    const rows = await this.db
      .select()
      .from(contentAssets)
      .where(eq(contentAssets.id, id))
      .limit(1);
    return rows[0] || null;
  }

  async findByObjectKey(objectKey: string): Promise<ContentAssetRecord | null> {
    const rows = await this.db
      .select()
      .from(contentAssets)
      .where(eq(contentAssets.objectKey, objectKey))
      .limit(1);
    return rows[0] || null;
  }

  async findBySha256(sha256: string): Promise<ContentAssetRecord | null> {
    const rows = await this.db
      .select()
      .from(contentAssets)
      .where(eq(contentAssets.sha256, sha256))
      .limit(1);
    return rows[0] || null;
  }

  async create(data: InsertContentAsset): Promise<ContentAssetRecord> {
    const rows = await this.db
      .insert(contentAssets)
      .values(data)
      .returning();
    return rows[0];
  }

  async update(
    id: string,
    data: Partial<Omit<InsertContentAsset, 'id' | 'createdAt'>>
  ): Promise<ContentAssetRecord | null> {
    const rows = await this.db
      .update(contentAssets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contentAssets.id, id))
      .returning();
    return rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(contentAssets).where(eq(contentAssets.id, id));
  }
}
