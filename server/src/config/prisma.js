// =============================================================
// Prisma client singleton
// Reuses the same PrismaClient instance across hot-reloads
// in development (avoids "too many connections" error).
// =============================================================

'use strict';

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const globalForPrisma = globalThis;

// Prisma 7 requires a driver adapter for the DB connection.
// The connection URL lives in the environment (see prisma.config.ts for CLI/migrate).
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
