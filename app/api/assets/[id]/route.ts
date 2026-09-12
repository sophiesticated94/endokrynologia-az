import type { NextRequest } from 'next/server';
import { getDefaultDatabase } from '@/db/postgres/index.ts';
import { ContentAssetRepository } from '@/lib/content/asset-repository.ts';
import { getDefaultObjectStorage } from '@/lib/storage/create-object-storage.ts';
import type { StorageKey } from '@/lib/storage/storage-key.ts';

export const dynamic = 'force-dynamic';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  const params = await context.params;
  const assetId = params?.id;

  if (!assetId || !UUID_REGEX.test(assetId)) {
    return new Response(JSON.stringify({ error: 'Invalid asset ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { db } = getDefaultDatabase();
    const assetRepo = new ContentAssetRepository(db);
    const asset = await assetRepo.findById(assetId);

    if (!asset) {
      return new Response(JSON.stringify({ error: 'Asset not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const etag = `"${asset.sha256}"`;
    const ifNoneMatch = request.headers.get('if-none-match');
    if (ifNoneMatch === etag || ifNoneMatch === asset.sha256) {
      return new Response(null, {
        status: 304,
        headers: {
          ETag: etag,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    const storage = getDefaultObjectStorage();
    const stream = await storage.getStream(asset.objectKey as StorageKey);

    if (!stream) {
      return new Response(JSON.stringify({ error: 'Asset binary not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': asset.mimeType,
        'Content-Length': String(asset.byteSize),
        ETag: etag,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err: unknown) {
    const requestId = crypto.randomUUID();
    console.error(`[asset-api] [${requestId}] Error retrieving asset ${assetId}:`, err);

    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        requestId,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
