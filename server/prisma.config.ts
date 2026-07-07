// =============================================================
// Prisma config — BK English Center (Prisma 7+)
//
// Prisma 7 no longer allows `url` inside schema.prisma's datasource.
// The connection URL for CLI commands (migrate / db / studio) lives
// here; the runtime PrismaClient connects via the pg driver adapter
// (see src/config/prisma.js).
// =============================================================

import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // undefined at build time (e.g. `prisma generate`) is fine —
    // only migrate/db commands actually need a live connection.
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: 'node prisma/seed.js',
  },
});
