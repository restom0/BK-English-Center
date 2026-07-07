const prisma = require('../config/prisma');

class Course {
  async getCourses() {
    return prisma.course.findMany();
  }

  async getCourseForAll() {
    return prisma.course.findMany({
      select: {
        name: true,
        intro: true,
        img: true,
        imgintro: true,
        short: true,
        description: true,
      },
    });
  }

  async getCourse(name) {
    const row = await prisma.course.findUnique({
      where: { name },
      select: {
        name: true,
        description: true,
        paidStudent: true,
        prizeStudent: true,
        maxAttendDate: true,
      },
    });
    if (!row) return null;
    return [row];
  }

  async addCourse(
    name,
    intro,
    img,
    imgintro,
    short,
    description,
    paidStudent,
    prizeStudent,
    paidTeacher,
    prizeTeacher,
    maxAttendDate
  ) {
    const existing = await prisma.course.findUnique({ where: { name } });
    if (existing) return null;
    return prisma.course.create({
      data: {
        name,
        intro,
        img,
        imgintro,
        short,
        description,
        paidStudent: Number(paidStudent),
        prizeStudent: Number(prizeStudent),
        paidTeacher: Number(paidTeacher),
        prizeTeacher: Number(prizeTeacher),
        maxAttendDate: Number(maxAttendDate),
      },
    });
  }

  async updateCourse(
    oldname,
    name,
    intro,
    img,
    imgintro,
    short,
    description,
    paidStudent,
    prizeStudent,
    paidTeacher,
    prizeTeacher,
    maxAttendDate
  ) {
    if (oldname !== name) {
      const conflict = await prisma.course.findUnique({ where: { name } });
      if (conflict) return null;
    }
    try {
      await prisma.course.update({
        where: { name: oldname },
        data: {
          name,
          intro,
          img,
          imgintro,
          short,
          description,
          paidStudent: Number(paidStudent),
          prizeStudent: Number(prizeStudent),
          paidTeacher: Number(paidTeacher),
          prizeTeacher: Number(prizeTeacher),
          maxAttendDate: Number(maxAttendDate),
          version: { increment: 1 },
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteCourse(name) {
    const course = await prisma.course.findUnique({
      where: { name },
      include: { classes: { select: { id: true } } },
    });
    if (!course) return false;
    if (course.classes.length > 0) return false;
    try {
      await prisma.course.delete({ where: { name } });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = new Course();
