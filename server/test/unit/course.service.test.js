'use strict';

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://u:p@localhost:5432/db';

const mockCourse = {
  getCourses: jest.fn(),
  getCourseForAll: jest.fn(),
  getCourse: jest.fn(),
  addCourse: jest.fn(),
  updateCourse: jest.fn(),
  deleteCourse: jest.fn(),
};

const mockRedis = {
  cacheGet: jest.fn(),
  cacheSet: jest.fn(),
  cacheDel: jest.fn(),
  cacheDelPattern: jest.fn(),
};

jest.mock('../../src/models/Course', () => mockCourse);
jest.mock('../../src/config/redis', () => mockRedis);

const CourseService = require('../../src/services/CourseService');

describe('CourseService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getPublic returns cached data without hitting the model', async () => {
    const cached = [{ name: 'IELTS' }];
    mockRedis.cacheGet.mockResolvedValue(cached);

    await expect(CourseService.getPublic()).resolves.toBe(cached);

    expect(mockRedis.cacheGet).toHaveBeenCalledWith('course:public');
    expect(mockCourse.getCourseForAll).not.toHaveBeenCalled();
    expect(mockRedis.cacheSet).not.toHaveBeenCalled();
  });

  test('getPublic reads from the model and caches on a miss', async () => {
    const rows = [{ name: 'TOEIC' }];
    mockRedis.cacheGet.mockResolvedValue(null);
    mockCourse.getCourseForAll.mockResolvedValue(rows);

    await expect(CourseService.getPublic()).resolves.toBe(rows);

    expect(mockCourse.getCourseForAll).toHaveBeenCalledTimes(1);
    expect(mockRedis.cacheSet).toHaveBeenCalledWith('course:public', rows);
  });

  test('getOne does not cache missing course details', async () => {
    mockRedis.cacheGet.mockResolvedValue(null);
    mockCourse.getCourse.mockResolvedValue(null);

    await expect(CourseService.getOne('Missing')).resolves.toBeNull();

    expect(mockRedis.cacheGet).toHaveBeenCalledWith('course:name:Missing');
    expect(mockRedis.cacheSet).not.toHaveBeenCalled();
  });

  test('create invalidates course cache after delegating to the model', async () => {
    const fields = ['IELTS', 'intro', 'img', 'imgintro', 'short', 'desc', 10, 5, 8, 4, 30];
    const created = { name: 'IELTS' };
    mockCourse.addCourse.mockResolvedValue(created);

    await expect(CourseService.create(fields)).resolves.toBe(created);

    expect(mockCourse.addCourse).toHaveBeenCalledWith(...fields);
    expect(mockRedis.cacheDelPattern).toHaveBeenCalledWith('course:*');
  });

  test('remove invalidates course cache even when the model returns false', async () => {
    mockCourse.deleteCourse.mockResolvedValue(false);

    await expect(CourseService.remove('IELTS')).resolves.toBe(false);

    expect(mockCourse.deleteCourse).toHaveBeenCalledWith('IELTS');
    expect(mockRedis.cacheDelPattern).toHaveBeenCalledWith('course:*');
  });
});
