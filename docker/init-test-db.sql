-- Create the test database if it does not already exist
SELECT 'CREATE DATABASE endokrynologia_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'endokrynologia_test')\gexec
