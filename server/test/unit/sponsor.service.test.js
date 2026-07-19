'use strict';

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://u:p@localhost:5432/db';

const mockSponsor = {
  getSponsors: jest.fn(),
  addSponsor: jest.fn(),
  updateSponsor: jest.fn(),
  deleteSponsor: jest.fn(),
};

const mockRedis = {
  cacheGet: jest.fn(),
  cacheSet: jest.fn(),
  cacheDel: jest.fn(),
  cacheDelPattern: jest.fn(),
};

jest.mock('../../src/models/Sponsor', () => mockSponsor);
jest.mock('../../src/config/redis', () => mockRedis);

const SponsorService = require('../../src/services/SponsorService');

describe('SponsorService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll returns cached data without hitting the model', async () => {
    const cached = [{ name: 'Acme' }];
    mockRedis.cacheGet.mockResolvedValue(cached);

    await expect(SponsorService.getAll()).resolves.toBe(cached);

    expect(mockRedis.cacheGet).toHaveBeenCalledWith('sponsor:all');
    expect(mockSponsor.getSponsors).not.toHaveBeenCalled();
    expect(mockRedis.cacheSet).not.toHaveBeenCalled();
  });

  test('getAll reads from the model and caches on a miss', async () => {
    const rows = [{ name: 'Globex' }];
    mockRedis.cacheGet.mockResolvedValue(null);
    mockSponsor.getSponsors.mockResolvedValue(rows);

    await expect(SponsorService.getAll()).resolves.toBe(rows);

    expect(mockSponsor.getSponsors).toHaveBeenCalledTimes(1);
    expect(mockRedis.cacheSet).toHaveBeenCalledWith('sponsor:all', rows);
  });

  test('create delegates to the model and invalidates the cache', async () => {
    mockSponsor.addSponsor.mockResolvedValue({ id: 1 });

    await expect(SponsorService.create('Acme', 1000, 'paid')).resolves.toEqual({ id: 1 });

    expect(mockSponsor.addSponsor).toHaveBeenCalledWith('Acme', 1000, 'paid');
    expect(mockRedis.cacheDelPattern).toHaveBeenCalledWith('sponsor:*');
  });

  test('update delegates to the model and invalidates the cache', async () => {
    mockSponsor.updateSponsor.mockResolvedValue(true);

    await expect(SponsorService.update(7, 'Acme', 2000, 'pending')).resolves.toBe(true);

    expect(mockSponsor.updateSponsor).toHaveBeenCalledWith(7, 'Acme', 2000, 'pending');
    expect(mockRedis.cacheDelPattern).toHaveBeenCalledWith('sponsor:*');
  });

  test('remove invalidates the cache even when the model returns false', async () => {
    mockSponsor.deleteSponsor.mockResolvedValue(false);

    await expect(SponsorService.remove(7)).resolves.toBe(false);

    expect(mockSponsor.deleteSponsor).toHaveBeenCalledWith(7);
    expect(mockRedis.cacheDelPattern).toHaveBeenCalledWith('sponsor:*');
  });
});
