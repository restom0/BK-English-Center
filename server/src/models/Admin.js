const prisma = require('../config/prisma');
const { Prisma } = require('@prisma/client');

class Admin {
  async getAdmin(id, role) {
    const numId = Number(id);
    if (role === 'student') return prisma.student.findUnique({ where: { id: numId } });
    else if (role === 'teacher') return prisma.teacher.findUnique({ where: { id: numId } });
    else if (role === 'staff') return prisma.staff.findUnique({ where: { id: numId } });
    else if (role === 'admin') return prisma.admin.findUnique({ where: { id: numId } });
    return null;
  }

  async getIncome() {
    const rows = await prisma.studentJoinClass.findMany({
      where: { paidStatus: { not: null } },
      include: {
        student: { select: { name: true } },
        class: {
          select: { name: true, course: { select: { paidStudent: true } } },
        },
      },
    });
    return rows.map((r) => ({
      name: r.student.name,
      className: r.class.name,
      pay: r.class.course.paidStudent,
      status: r.paidStatus,
    }));
  }

  async getOutcome() {
    // Student prizes
    const studentPrize = await prisma.studentJoinClass.findMany({
      where: { prizeStatus: { not: null } },
      include: {
        student: { select: { name: true } },
        class: { select: { name: true, course: { select: { prizeStudent: true } } } },
      },
    });
    // Teacher paid + prize
    const teacherAll = await prisma.teacherJoinClass.findMany({
      where: { OR: [{ paidStatus: { not: null } }, { prizeStatus: { not: null } }] },
      include: {
        teacher: { select: { name: true } },
        class: {
          select: { name: true, course: { select: { paidTeacher: true, prizeTeacher: true } } },
        },
      },
    });
    // Staff paid + prize
    const staffAll = await prisma.manageStaff.findMany({
      where: { OR: [{ paidStatus: { not: null } }, { prizeStatus: { not: null } }] },
      include: { staff: { select: { name: true } } },
    });

    const result = [];
    for (const r of studentPrize)
      result.push({
        name: r.student.name,
        className: r.class.name,
        prize: r.class.course.prizeStudent,
        status: r.prizeStatus,
      });
    for (const r of teacherAll) {
      if (r.prizeStatus !== null)
        result.push({
          name: r.teacher.name,
          className: r.class.name,
          prize: r.class.course.prizeTeacher,
          status: r.prizeStatus,
        });
      if (r.paidStatus !== null)
        result.push({
          name: r.teacher.name,
          className: r.class.name,
          prize: r.class.course.paidTeacher,
          status: r.paidStatus,
        });
    }
    for (const r of staffAll) {
      if (r.paidStatus !== null)
        result.push({ name: r.staff.name, className: 0, prize: r.paid || 0, status: r.paidStatus });
      if (r.prizeStatus !== null)
        result.push({
          name: r.staff.name,
          className: 0,
          prize: r.prize || 0,
          status: r.prizeStatus,
        });
    }
    return result;
  }

  async getStat() {
    const [countAccess, countTeacher, countStudent, countStaff] = await Promise.all([
      prisma.log.count(),
      prisma.teacher.count(),
      prisma.student.count(),
      prisma.staff.count(),
    ]);
    return { countAccess, countTeacher, countStudent, countStaff };
  }
}

module.exports = new Admin();
