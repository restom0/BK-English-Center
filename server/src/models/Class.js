const prisma = require('../config/prisma');

class ClassModel {
  async getClasses() {
    const classes = await prisma.class.findMany({
      include: {
        course: { select: { name: true } },
        teacherJoinClass: { include: { teacher: { select: { name: true } } } },
        _count: { select: { studentJoinClass: true } },
      },
    });
    return classes.map((c) => ({
      id: c.id,
      name: c.name,
      address: c.address,
      maxStudent: c.maxStudent,
      startDate: c.startDate,
      endDate: c.endDate,
      schedule: c.schedule,
      courseName: c.course.name,
      teacherName: c.teacherJoinClass[0]?.teacher?.name || null,
      countStudent: c._count.studentJoinClass,
    }));
  }

  async getClass(name) {
    const c = await prisma.class.findUnique({
      where: { name },
      include: {
        course: { select: { name: true } },
        teacherJoinClass: { include: { teacher: { select: { name: true } } } },
      },
    });
    if (!c) return [];
    return [
      {
        name: c.name,
        address: c.address,
        maxStudent: c.maxStudent,
        startDate: c.startDate,
        endDate: c.endDate,
        schedule: c.schedule,
        courseName: c.course.name,
        teacherName: c.teacherJoinClass[0]?.teacher?.name || null,
      },
    ];
  }

  async addClass(name, idCourse, startDate, endDate, maxStudent, address, schedule) {
    const existing = await prisma.class.findUnique({ where: { name } });
    if (existing) return null;
    return prisma.class.create({
      data: {
        name,
        idCourse: Number(idCourse),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        maxStudent: Number(maxStudent),
        address,
        schedule,
      },
    });
  }

  async updateClass(name, idCourse, startDate, endDate, maxStudent, address, schedule, oldname) {
    try {
      await prisma.class.update({
        where: { name: oldname },
        data: {
          name,
          idCourse: Number(idCourse),
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          maxStudent: Number(maxStudent),
          address,
          schedule,
          version: { increment: 1 },
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async removeClass(name) {
    try {
      return await prisma.class.delete({ where: { name } });
    } catch {
      return null;
    }
  }
}

module.exports = new ClassModel();
