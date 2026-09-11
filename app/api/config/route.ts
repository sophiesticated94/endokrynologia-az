import { env } from 'cloudflare:workers';
import { isSafePublicKey } from '@/lib/learning';

export const dynamic = 'force-dynamic';

export function GET() {
  const vars = env as unknown as Record<string, string | undefined>;
  const url = vars.SUPABASE_URL ?? process.env.SUPABASE_URL ?? '';
  const key = vars.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY ?? vars.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? '';

  let valid = false;
  try {
    const u = new URL(url);
    valid = u.protocol === 'https:' && isSafePublicKey(key);
  } catch {}

  // Only verified public/anon keys are returned. Secret and service-role keys are strictly rejected.
  return Response.json(
    valid ? { configured: true, url, key } : { configured: false },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
