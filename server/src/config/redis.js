// =============================================================
// Redis client (ioredis)
// Provides get/set/del helpers used by the service layer.
// Falls back gracefully when Redis is unavailable (dev/test).
// =============================================================

'use strict';

const Redis = require('ioredis');
const env = require('./env');

let client;

const getClient = () => {
  if (client) return client;

  client = new Redis(env.redisUrl, {
    lazyConnect: true,
    enableOfflineQueue: false,
    maxRetriesPerRequest: 1,
    retryStrategy: (times) => {
      // Back off up to 10 s; stop retrying after 5 failures
      if (times > 5) return null;
      return Math.min(times * 200, 10_000);
    },
  });

  client.on('connect', () => console.log('[Redis] connected'));
  client.on('error', (err) => console.error('[Redis] error:', err.message));

  return client;
};

// ── Helpers ───────────────────────────────────────────────────

/**
 * Get a JSON value from cache.
 * Returns null when Redis is down or key is missing.
 */
const cacheGet = async (key) => {
  try {
    const raw = await getClient().get(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Store a JSON value in cache with a TTL (seconds).
 */
const cacheSet = async (key, value, ttl = env.cacheTtl) => {
  try {
    await getClient().set(key, JSON.stringify(value), 'EX', ttl);
  } catch {
    // Cache write failure is non-fatal
  }
};

/**
 * Delete one or more cache keys (invalidation on CUD).
 */
const cacheDel = async (...keys) => {
  try {
    if (keys.length > 0) await getClient().del(...keys);
  } catch {
    // Ignore
  }
};

/**
 * Delete all keys matching a pattern (e.g. "course:*").
 */
const cacheDelPattern = async (pattern) => {
  try {
    const redis = getClient();
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(...keys);
  } catch {
    // Ignore
  }
};

module.exports = { getClient, cacheGet, cacheSet, cacheDel, cacheDelPattern };
