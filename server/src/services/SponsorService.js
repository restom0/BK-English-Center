// =============================================================
// SponsorService — business logic + Redis cache for Sponsors
// =============================================================

'use strict';

const Sponsor = require('../models/Sponsor');
const { cacheGet, cacheSet, cacheDelPattern } = require('../config/redis');

const KEY_ALL = 'sponsor:all';

class SponsorService {
  async getAll() {
    const cached = await cacheGet(KEY_ALL);
    if (cached) return cached;
    const data = await Sponsor.getSponsors();
    await cacheSet(KEY_ALL, data);
    return data;
  }

  async create(name, amount, status) {
    const result = await Sponsor.addSponsor(name, amount, status);
    await cacheDelPattern('sponsor:*');
    return result;
  }

  async update(id, name, amount, status) {
    const result = await Sponsor.updateSponsor(id, name, amount, status);
    await cacheDelPattern('sponsor:*');
    return result;
  }

  async remove(id) {
    const result = await Sponsor.deleteSponsor(id);
    await cacheDelPattern('sponsor:*');
    return result;
  }
}

module.exports = new SponsorService();
