// DEPRECATED — this MySQL2 pool is no longer used.
// All database access is now via Prisma (src/config/prisma.js).
// This file is kept only to avoid import errors during transition.
// It will be removed in the next cleanup.
throw new Error(
  '[DEPRECATED] src/config/database is no longer in use. ' + 'Use src/config/prisma.js instead.'
);
