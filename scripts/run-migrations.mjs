import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import path from 'node:path';

export async function runMigrations(databaseUrl) {
  const url =
    databaseUrl ||
    process.env.DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/endokrynologia_dev';

  const sql = postgres(url, { max: 1 });
  const db = drizzle(sql);

  try {
    const migrationsFolder = path.resolve(process.cwd(), 'db/postgres/migrations');
    await migrate(db, { migrationsFolder });
    console.log(
      `[migrations] Migrations applied successfully to ${url.replace(/:[^:@]+@/, ':***@')}`
    );
  } finally {
    await sql.end();
  }
}

if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('scripts/run-migrations.mjs')) {
  runMigrations().catch((err) => {
    console.error('[migrations] Migration failed:', err);
    process.exit(1);
  });
}
