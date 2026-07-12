const prisma = require('../config/prisma');

// Helper to shape SJC rows for list responses
function shapeSJC(r, withDates = false) {
  const base = {
    id: r.id,
    idStudent: r.idStudent,
    idClass: r.idClass,
    name: r.student?.name,
    attendDate: r.attendDate,
    listening: r.listening,
    writing: r.writing,
    speaking: r.speaking,
    reading: r.reading,
    status: r.status,
    paid: r.class?.course?.paidStudent,
    prize: r.class?.course?.prizeStudent,
    paidStatus: r.paidStatus,
    prizeStatus: r.prizeStatus,
    className: r.class?.name,
    teacherName: r.class?.teacherJoinClass?.[0]?.teacher?.name || null,
  };
  if (withDates) {
    base.startDate = r.class?.startDate;
    base.endDate = r.class?.endDate;
  }
  return base;
}

const FULL_INCLUDE = {
  student: { select: { name: true } },
  class: {
    select: {
      name: true,
      startDate: true,
      endDate: true,
      course: { select: { paidStudent: true, prizeStudent: true, maxAttendDate: true } },
      teacherJoinClass: { include: { teacher: { select: { name: true } } } },
    },
  },
};

class StudentJoinClass {
  async getStudentJoinClasses() {
    const rows = await prisma.studentJoinClass.findMany({
      orderBy: { id: 'asc' },
      include: FULL_INCLUDE,
    });
    return rows.map((r) => shapeSJC(r));
  }

  async getStudentJoinClass(id) {
    const rows = await prisma.studentJoinClass.findMany({
      where: { idStudent: Number(id) },
      include: FULL_INCLUDE,
    });
    return rows.map((r) => shapeSJC(r, true));
  }

  async addStudentJoinClass(idStudent, idClass) {
    const existing = await prisma.studentJoinClass.findMany({
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
    return prisma.studentJoinClass.create({
      data: {
        idStudent: Number(idStudent),
        idClass: Number(idClass),
        attendDate: 0,
        status: -1,
        listening: 0,
        writing: 0,
        speaking: 0,
        reading: 0,
        paidStatus: 0,
      },
    });
  }

  async editStudentJoinClass(
    idStudent,
    idClass,
    attendDate,
    listening,
    writing,
    speaking,
    reading,
    paidStatus,
    prizeStatus,
    id
  ) {
    return prisma.studentJoinClass.update({
      where: { id: Number(id) },
      data: {
        idStudent: Number(idStudent),
        idClass: Number(idClass),
        attendDate: Number(attendDate),
        listening: Number(listening),
        writing: Number(writing),
        speaking: Number(speaking),
        reading: Number(reading),
        paidStatus: paidStatus !== undefined ? Number(paidStatus) : undefined,
        prizeStatus: prizeStatus !== undefined ? Number(prizeStatus) : undefined,
        version: { increment: 1 },
      },
    });
  }

  async getNullClass() {
    const rows = await prisma.class.findMany({
      include: {
        _count: { select: { studentJoinClass: true } },
      },
    });
    return rows
      .filter((c) => c._count.studentJoinClass < c.maxStudent)
      .map((c) => ({
        id: c.id,
        name: c.name,
        total_students: c._count.studentJoinClass,
        maxStudent: c.maxStudent,
      }));
  }

  async getNullSalary() {
    const rows = await prisma.studentJoinClass.findMany({
      where: { paidStatus: null },
      include: FULL_INCLUDE,
    });
    return rows.map((r) => shapeSJC(r));
  }

  async getNullPrize() {
    const rows = await prisma.studentJoinClass.findMany({
      where: { prizeStatus: null },
      include: {
        student: { select: { name: true } },
        class: { select: { name: true } },
      },
    });
    return rows.map((r) => ({
      id: r.id,
      idClass: r.idClass,
      name: r.student.name,
      prizeStatus: r.prizeStatus,
      className: r.class.name,
    }));
  }

  async getNullRating() {
    const rows = await prisma.studentJoinClass.findMany({
      where: {
        listening: 0,
        writing: 0,
        speaking: 0,
        reading: 0,
      },
      include: FULL_INCLUDE,
    });
    return rows.map((r) => shapeSJC(r));
  }

  async getSalary() {
    const rows = await prisma.studentJoinClass.findMany({ include: FULL_INCLUDE });
    return rows.map((r) => shapeSJC(r));
  }

  async getPrize() {
    const rows = await prisma.studentJoinClass.findMany({
      where: { prizeStatus: { not: null } },
      include: FULL_INCLUDE,
    });
    return rows.map((r) => shapeSJC(r));
  }

  async createSalary(paidStatus, id, idClass) {
    try {
      const result = await prisma.studentJoinClass.updateMany({
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
      const result = await prisma.studentJoinClass.updateMany({
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
      const result = await prisma.studentJoinClass.update({
        where: { id: Number(id) },
        data: { attendDate: attend, status: Number(status), version: { increment: 1 } },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async updateRating(listening, writing, speaking, reading, id) {
    try {
      const result = await prisma.studentJoinClass.update({
        where: { id: Number(id) },
        data: {
          listening: Number(listening),
          writing: Number(writing),
          speaking: Number(speaking),
          reading: Number(reading),
          version: { increment: 1 },
        },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async updateSalary(paidStatus, id) {
    try {
      const result = await prisma.studentJoinClass.update({
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
      const result = await prisma.studentJoinClass.update({
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
      const result = await prisma.studentJoinClass.update({
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
      const result = await prisma.studentJoinClass.update({
        where: { id: Number(id) },
        data: { prizeStatus: null },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async deleteStudentJoinClass(id) {
    try {
      return await prisma.studentJoinClass.delete({ where: { id: Number(id) } });
    } catch {
      return null;
    }
  }
}

module.exports = new StudentJoinClass();
