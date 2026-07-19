'use strict';

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://u:p@localhost:5432/db';

const mockTeacher = {
  getTeachers: jest.fn(),
  getTeacher: jest.fn(),
  editTeacher: jest.fn(),
};

const mockRedis = {
  cacheGet: jest.fn(),
  cacheSet: jest.fn(),
  cacheDel: jest.fn(),
  cacheDelPattern: jest.fn(),
};

jest.mock('../../src/models/Teacher', () => mockTeacher);
jest.mock('../../src/config/redis', () => mockRedis);

const TeacherService = require('../../src/services/TeacherService');

describe('TeacherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll returns cached data without hitting the model', async () => {
    const cached = [{ id: 1 }];
    mockRedis.cacheGet.mockResolvedValue(cached);

    await expect(TeacherService.getAll()).resolves.toBe(cached);

    expect(mockRedis.cacheGet).toHaveBeenCalledWith('teacher:all');
    expect(mockTeacher.getTeachers).not.toHaveBeenCalled();
  });

  test('getAll reads from the model and caches on a miss', async () => {
    const rows = [{ id: 2 }];
    mockRedis.cacheGet.mockResolvedValue(null);
    mockTeacher.getTeachers.mockResolvedValue(rows);

    await expect(TeacherService.getAll()).resolves.toBe(rows);

    expect(mockRedis.cacheSet).toHaveBeenCalledWith('teacher:all', rows);
  });

  test('getOne returns the cached teacher without hitting the model', async () => {
    const cached = { id: 5 };
    mockRedis.cacheGet.mockResolvedValue(cached);

    await expect(TeacherService.getOne(5)).resolves.toBe(cached);

    expect(mockRedis.cacheGet).toHaveBeenCalledWith('teacher:id:5');
    expect(mockTeacher.getTeacher).not.toHaveBeenCalled();
  });

  test('getOne caches a found teacher on a miss', async () => {
    const row = { id: 5, name: 'Anh' };
    mockRedis.cacheGet.mockResolvedValue(null);
    mockTeacher.getTeacher.mockResolvedValue(row);

    await expect(TeacherService.getOne(5)).resolves.toBe(row);

    expect(mockRedis.cacheSet).toHaveBeenCalledWith('teacher:id:5', row);
  });

  test('getOne does not cache a missing teacher', async () => {
    mockRedis.cacheGet.mockResolvedValue(null);
    mockTeacher.getTeacher.mockResolvedValue(null);

    await expect(TeacherService.getOne(404)).resolves.toBeNull();

    expect(mockRedis.cacheSet).not.toHaveBeenCalled();
  });

  test('update delegates to the model and clears both cache keys', async () => {
    mockTeacher.editTeacher.mockResolvedValue(true);

    await expect(
      TeacherService.update(5, 'Anh', 'female', '1990-01-01', '0900', 'HCM', 'a@b.c')
    ).resolves.toBe(true);

    expect(mockTeacher.editTeacher).toHaveBeenCalledWith(
      5,
      'Anh',
      'female',
      '1990-01-01',
      '0900',
      'HCM',
      'a@b.c'
    );
    expect(mockRedis.cacheDel).toHaveBeenCalledWith('teacher:all', 'teacher:id:5');
  });
});
