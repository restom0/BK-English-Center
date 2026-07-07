const prisma = require('../config/prisma');

function shapeTJC(r, withDates = false) {
  const base = {
    id: r.id,
    idTeacher: r.idTeacher,
    idClass: r.idClass,
    name: r.teacher?.name,
    attendDate: r.attendDate,
    rating: r.rating,
    status: r.status,
    paidTeacher: r.class?.course?.paidTeacher,
    prize: r.class?.course?.prizeTeacher,
    paidStatus: r.paidStatus,
    prizeStatus: r.prizeStatus,
    className: r.class?.name,
  };
  if (withDates) {
    base.startDate = r.class?.startDate;
    base.endDate = r.class?.endDate;
  }
  return base;
}

const FULL_INCLUDE = {
  teacher: { select: { name: true } },
  class: {
    select: {
      name: true,
      startDate: true,
      endDate: true,
      course: { select: { paidTeacher: true, prizeTeacher: true, maxAttendDate: true } },
    },
  },
};

class TeacherJoinClass {
  async getTeacherJoinClasses() {
    const rows = await prisma.teacherJoinClass.findMany({ include: FULL_INCLUDE });
    return rows.map((r) => shapeTJC(r));
  }

  async getTeacherJoinClass(id) {
    const rows = await prisma.teacherJoinClass.findMany({
      where: { idTeacher: Number(id) },
      include: FULL_INCLUDE,
    });
    return rows.map((r) => shapeTJC(r, true));
  }

  async addTeacherJoinClass(idTeacher, idClass) {
    const existing = await prisma.teacherJoinClass.findMany({
      where: { idClass: Number(idClass) },
    });
    const classData = await prisma.class.findUnique({
      where: { id: Number(idClass) },
      include: { course: { select: { maxAttendDate: true } } },
    });
    if (existing.length > 0) {
      const first = existing[0];
      if (first.status === 1 && first.attendDate < classData.course.maxAttendDate) return null;
      if (first.status === 1 || first.status === 0) return null;
    }
    return prisma.teacherJoinClass.create({
      data: {
        idTeacher: Number(idTeacher),
        idClass: Number(idClass),
        attendDate: 0,
        status: -1,
        rating: 0,
        paidStatus: 0,
      },
    });
  }

  async editTeacherJoinClass(idTeacher, idClass, attendDate, rating, paidStatus, prizeStatus, id) {
    return prisma.teacherJoinClass.update({
      where: { id: Number(id) },
      data: {
        idTeacher: Number(idTeacher),
        idClass: Number(idClass),
        attendDate: Number(attendDate),
        rating: Number(rating),
        paidStatus: paidStatus !== undefined ? Number(paidStatus) : undefined,
        prizeStatus: prizeStatus !== undefined ? Number(prizeStatus) : undefined,
        version: { increment: 1 },
      },
    });
  }

  async getNullClass() {
    const rows = await prisma.class.findMany({
      include: {
        teacherJoinClass: true,
        course: { select: { maxAttendDate: true } },
      },
    });
    return rows
      .filter((c) => {
        const tjc = c.teacherJoinClass[0];
        return !tjc || (tjc.status === 1 && c.course.maxAttendDate > tjc.attendDate);
      })
      .map((c) => ({ id: c.id, name: c.name }));
  }

  async getNullRating() {
    const rows = await prisma.teacherJoinClass.findMany({
      where: { rating: 0 },
      include: FULL_INCLUDE,
    });
    return rows.map((r) => shapeTJC(r));
  }

  async getNullSalary() {
    const rows = await prisma.teacherJoinClass.findMany({
      where: { paidStatus: null },
      include: FULL_INCLUDE,
    });
    return rows.map((r) => shapeTJC(r));
  }

  async getNullPrize() {
    const rows = await prisma.teacherJoinClass.findMany({
      where: { prizeStatus: null },
      include: { teacher: { select: { name: true } }, class: { select: { name: true } } },
    });
    return rows.map((r) => ({
      id: r.id,
      idClass: r.idClass,
      name: r.teacher.name,
      prizeStatus: r.prizeStatus,
      className: r.class.name,
    }));
  }

  async getSalary() {
    const rows = await prisma.teacherJoinClass.findMany({ include: FULL_INCLUDE });
    return rows.map((r) => {
      const max = r.class?.course?.maxAttendDate || 1;
      return {
        ...shapeTJC(r),
        paid: r.class?.course?.paidTeacher
          ? Math.round((r.attendDate * r.class.course.paidTeacher) / max)
          : 0,
      };
    });
  }

  async getPrize() {
    const rows = await prisma.teacherJoinClass.findMany({
      where: { prizeStatus: { not: null } },
      include: FULL_INCLUDE,
    });
    return rows.map((r) => shapeTJC(r));
  }

  async createSalary(paidStatus, id, idClass) {
    try {
      const result = await prisma.teacherJoinClass.updateMany({
        where: { id: Number(id), idClass: Number(idClass) },
        data: { paidStatus: Number(paidStatus) },
      });
      return result.count > 0;
    } catch {
      return false;
    }
  }

  async createPrize(prizeStatus, id, idClass) {
    try {
      const result = await prisma.teacherJoinClass.updateMany({
        where: { id: Number(id), idClass: Number(idClass) },
        data: { prizeStatus: Number(prizeStatus) },
      });
      return result.count > 0;
    } catch {
      return false;
    }
  }

  async updateDate(attendDate, status, id, idClass) {
    const classData = await prisma.class.findUnique({
      where: { id: Number(idClass) },
      include: { course: { select: { maxAttendDate: true } } },
    });
    const max = classData.course.maxAttendDate;
    const attend = Number(attendDate);
    if (attend > max) return -1;
    if (!status) {
      if (attend < max) status = 0;
      else if (attend === max) status = 1;
    }
    try {
      const result = await prisma.teacherJoinClass.update({
        where: { id: Number(id) },
        data: { attendDate: attend, status: Number(status), version: { increment: 1 } },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async updateRating(rating, id) {
    try {
      const result = await prisma.teacherJoinClass.update({
        where: { id: Number(id) },
        data: { rating: Number(rating), version: { increment: 1 } },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async updateSalary(paidStatus, id) {
    try {
      const result = await prisma.teacherJoinClass.update({
        where: { id: Number(id) },
        data: { paidStatus: Number(paidStatus) },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async updatePrize(prizeStatus, id) {
    try {
      const result = await prisma.teacherJoinClass.update({
        where: { id: Number(id) },
        data: { prizeStatus: Number(prizeStatus) },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async deleteSalary(id) {
    try {
      const result = await prisma.teacherJoinClass.update({
        where: { id: Number(id) },
        data: { paidStatus: null },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async deletePrize(id) {
    try {
      const result = await prisma.teacherJoinClass.update({
        where: { id: Number(id) },
        data: { prizeStatus: null },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async deleteTeacherJoinClass(id) {
    try {
      return await prisma.teacherJoinClass.delete({ where: { id: Number(id) } });
    } catch {
      return null;
    }
  }
}

module.exports = new TeacherJoinClass();
