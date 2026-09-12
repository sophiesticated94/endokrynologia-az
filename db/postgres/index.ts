import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';

export type AppSchema = typeof schema;
export type AppDatabase = PostgresJsDatabase<AppSchema>;

export interface DatabaseConnection {
  db: AppDatabase;
  client: postgres.Sql;
  close: () => Promise<void>;
}

export function createDatabase(connectionUrl?: string): DatabaseConnection {
  const envUrl = process.env.DATABASE_URL;
  if (!connectionUrl && !envUrl && process.env.NODE_ENV === 'production') {
    throw new Error('DATABASE_URL environment variable is required in production mode');
  }

  const url =
    connectionUrl ||
    envUrl ||
    'postgresql://postgres:postgres@localhost:5432/endokrynologia_dev';

  const client = postgres(url, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    onnotice: () => {}, // Suppress noisy PG notices
  });

  const db = drizzle(client, { schema });

  return {
    db,
    client,
    close: async () => {
      await client.end();
    },
  };
}

let cachedConnection: DatabaseConnection | null = null;

export function getDefaultDatabase(): DatabaseConnection {
  if (!cachedConnection) {
    cachedConnection = createDatabase();
  }
  return cachedConnection;
}

export * from './schema.ts';
