#!/bin/sh

/usr/local/bin/wait-for-it.sh db 5432

echo "[ENTRYPOINT] Running database seeder..."
node dist/seeder/seed.js || echo "[SEEDER] Warning: Seeder failed"

echo "[ENTRYPOINT] Starting main NestJS app..."
exec "$@"