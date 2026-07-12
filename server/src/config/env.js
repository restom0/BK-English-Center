// =============================================================
// Centralized environment configuration
// All process.env access goes through this module.
// =============================================================

'use strict';

const env = {
  // Server
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database (PostgreSQL via Prisma)
  databaseUrl: process.env.DATABASE_URL || '',

  // JWT
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN || String(8 * 60 * 60), 10),

  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',

  // Email (Gmail SMTP)
  mailUser: process.env.MAIL_USER || '',
  mailPass: process.env.MAIL_PASS || '',

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5500',

  // Google OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',

  // Cache TTL (seconds)
  cacheTtl: parseInt(process.env.CACHE_TTL || '300', 10), // 5 min default
};

// Validate critical vars in production
if (env.nodeEnv === 'production') {
  const required = ['DATABASE_URL', 'JWT_SECRET', 'REDIS_URL', 'MAIL_USER', 'MAIL_PASS'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = env;
