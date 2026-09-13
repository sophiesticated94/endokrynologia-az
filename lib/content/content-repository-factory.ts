if (typeof window !== 'undefined') {
  throw new Error('ContentRepositoryFactory is server-only and cannot be executed in the browser.');
}

import { getDefaultDatabase, createDatabase, type AppDatabase } from '../../db/postgres/index.ts';
import {
  type ContentRepository,
  StaticContentRepository,
  PostgresContentRepository,
  ComparingContentRepository,
} from './content-repository.ts';

export interface RepositoryFactoryOptions {
  moduleId?: string;
  sourceMode?: 'static' | 'database' | 'compare';
  databaseUrl?: string;
  db?: AppDatabase;
}

export function getContentRepository(
  options: RepositoryFactoryOptions = {}
): ContentRepository {
  const sourceMode =
    options.sourceMode ||
    (process.env.CONTENT_SOURCE as 'static' | 'database' | 'compare') ||
    'static';

  const moduleId = options.moduleId?.toLowerCase().trim();

  const enabledModules = (process.env.CONTENT_DB_MODULES || '')
    .split(',')
    .map((m) => m.trim().toLowerCase())
    .filter(Boolean);

  const isDbEnabledForModule = moduleId
    ? enabledModules.includes('*') || enabledModules.includes('all') || enabledModules.includes(moduleId)
    : false;

  // If the requested module is NOT enabled in CONTENT_DB_MODULES, serve statically
  if (moduleId && !isDbEnabledForModule) {
    return new StaticContentRepository();
  }

  // If sourceMode is static, return static repository
  if (sourceMode === 'static') {
    return new StaticContentRepository();
  }

  // DB-based repository
  const db = options.db
    ? options.db
    : options.databaseUrl
      ? createDatabase(options.databaseUrl).db
      : getDefaultDatabase().db;

  const pgRepo = new PostgresContentRepository(db);

  if (sourceMode === 'database') {
    return pgRepo;
  }

  if (sourceMode === 'compare') {
    const staticRepo = new StaticContentRepository();
    return new ComparingContentRepository(staticRepo, pgRepo);
  }

  return new StaticContentRepository();
}
