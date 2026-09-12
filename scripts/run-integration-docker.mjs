import { spawn, spawnSync } from 'node:child_process';

function runSync(cmd, args) {
  const res = spawnSync(cmd, args, { stdio: 'inherit', shell: true });
  if (res.error) throw res.error;
  return res.status;
}

function runOutput(cmd, args) {
  const res = spawnSync(cmd, args, { encoding: 'utf-8', shell: true });
  return { status: res.status, stdout: res.stdout || '', stderr: res.stderr || '' };
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('[docker-test] Checking Docker compose...');
  const versionCheck = runOutput('docker', ['compose', 'version']);
  if (versionCheck.status !== 0) {
    console.error('[docker-test] Docker Compose is not available or not installed.');
    process.exit(1);
  }

  console.log('[docker-test] Starting PostgreSQL container via docker compose...');
  const upRes = runSync('docker', ['compose', 'up', '-d', 'postgres']);
  if (upRes !== 0) {
    console.error('[docker-test] Failed to start postgres container.');
    process.exit(upRes);
  }

  console.log('[docker-test] Waiting for postgres readiness...');
  let ready = false;
  for (let i = 0; i < 30; i++) {
    const check = runOutput('docker', [
      'compose',
      'exec',
      '-T',
      'postgres',
      'pg_isready',
      '-U',
      'postgres',
    ]);
    if (check.status === 0 && check.stdout.includes('accepting connections')) {
      ready = true;
      break;
    }
    await sleep(1000);
  }

  if (!ready) {
    console.error('[docker-test] Timeout waiting for postgres to become ready.');
    process.exit(1);
  }
  console.log('[docker-test] Postgres is ready.');

  // Ensure endokrynologia_test database exists
  const checkDb = runOutput('docker', [
    'compose',
    'exec',
    '-T',
    'postgres',
    'psql',
    '-U',
    'postgres',
    '-tc',
    "\"SELECT 1 FROM pg_database WHERE datname = 'endokrynologia_test'\"",
  ]);

  if (!checkDb.stdout.includes('1')) {
    console.log('[docker-test] Creating endokrynologia_test database...');
    runSync('docker', [
      'compose',
      'exec',
      '-T',
      'postgres',
      'createdb',
      '-U',
      'postgres',
      'endokrynologia_test',
    ]);
  }

  console.log('[docker-test] Running PostgreSQL integration tests...');
  const env = {
    ...process.env,
    DATABASE_URL_TEST: 'postgresql://postgres:postgres@localhost:5432/endokrynologia_test',
  };

  const testProcess = spawn('node', ['--test', 'tests/integration/postgres-modules.test.mjs'], {
    stdio: 'inherit',
    shell: true,
    env,
  });

  testProcess.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error('[docker-test] Fatal error:', err);
  process.exit(1);
});
