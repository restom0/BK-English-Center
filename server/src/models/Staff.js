const prisma = require('../config/prisma');

class Staff {
  async showStaff() {
    const rows = await prisma.staff.findMany({ include: { user: { select: { email: true } } } });
    return rows.map((s) => ({
      id: s.id,
      name: s.name,
      sex: s.sex,
      dateofbirth: s.dateofbirth,
      phone: s.phone,
      address: s.address,
      email: s.user.email,
    }));
  }

  async updateStaff(id, name, sex, dateofbirth, phone, address, email) {
    try {
      await prisma.staff.update({
        where: { id: Number(id) },
        data: {
          name,
          sex,
          dateofbirth: new Date(dateofbirth),
          phone,
          address,
          version: { increment: 1 },
        },
      });
      await prisma.user.update({ where: { id: Number(id) }, data: { email } });
      return true;
    } catch {
      return false;
    }
  }

  async deleteStaff(id) {
    try {
      await prisma.user.delete({ where: { id: Number(id) } }); // cascades to staff + managestaff
      return true;
    } catch {
      return false;
    }
  }

  async showTimeKeeping() {
    const rows = await prisma.manageStaff.findMany({
      include: {
        staff: { select: { name: true }, include: { user: { select: { email: true } } } },
      },
    });
    return rows.map((r) => ({
      id: r.idStaff,
      name: r.staff.name,
      month: r.month,
      year: r.year,
      attendDate: r.attendDate,
      email: r.staff.user.email,
    }));
  }

  async showTimeKeepingById(id) {
    const rows = await prisma.staff.findMany({
      where: { id: Number(id) },
      include: { user: { select: { email: true } } },
    });
    return rows.map((s) => ({
      id: s.id,
      name: s.name,
      sex: s.sex,
      dateofbirth: s.dateofbirth,
      phone: s.phone,
      address: s.address,
      email: s.user.email,
    }));
  }

  async addTimeKeeping(id) {
    // This was updating manageStaff by id (which is the PK), not idStaff
    try {
      await prisma.manageStaff.update({
        where: { id: Number(id) },
        data: { attendDate: { increment: 1 } },
      });
      return true;
    } catch {
      return false;
    }
  }

  async updateTimeKeeping(id, month, year, attendDate) {
    try {
      await prisma.manageStaff.updateMany({
        where: { idStaff: Number(id), month: Number(month), year: Number(year) },
        data: { attendDate: Number(attendDate) },
      });
      return true;
    } catch {
      return false;
    }
  }

  async insertManagestaff(id, month, year) {
    try {
      await prisma.manageStaff.create({
        data: { idStaff: Number(id), month: Number(month), year: Number(year), attendDate: 0 },
      });
      return true;
    } catch {
      return false;
    }
  }

  async getSalary() {
    const rows = await prisma.manageStaff.findMany({
      where: { OR: [{ paid: null }, { paidStatus: null }, { paid: 0 }] },
      include: { staff: { select: { name: true } } },
    });
    return rows.map((r) => ({
      id: r.idStaff,
      name: r.staff.name,
      month: r.month,
      year: r.year,
      paid: r.paid,
      paidStatus: r.paidStatus,
    }));
  }

  async showSalary() {
    const rows = await prisma.manageStaff.findMany({
      where: { paid: { not: null, gt: 0 }, paidStatus: { not: null } },
      orderBy: [{ month: 'desc' }, { year: 'desc' }],
      include: { staff: { select: { name: true } } },
    });
    return rows.map((r) => ({
      id: r.idStaff,
      name: r.staff.name,
      month: r.month,
      year: r.year,
      paid: r.paid,
      paidStatus: r.paidStatus,
    }));
  }

  async updateSalary(id, month, year, paid, paidStatus) {
    const existing = await prisma.manageStaff.findFirst({
      where: { idStaff: Number(id), month: Number(month), year: Number(year) },
    });
    if (!existing) return -1;
    const result = await prisma.manageStaff.updateMany({
      where: { idStaff: Number(id), month: Number(month), year: Number(year) },
      data: { paid: Number(paid), paidStatus: Number(paidStatus) },
    });
    return result.count > 0 ? 1 : 0;
  }

  async setNullSalary(id, month, year) {
    try {
      const result = await prisma.manageStaff.updateMany({
        where: { idStaff: Number(id), month: Number(month), year: Number(year) },
        data: { paid: null, paidStatus: null },
      });
      return result.count > 0;
    } catch {
      return false;
    }
  }

  async getPrize() {
    const rows = await prisma.manageStaff.findMany({
      where: { OR: [{ prize: null }, { prizeStatus: null }, { prize: 0 }] },
      include: { staff: { select: { name: true } } },
    });
    return rows.map((r) => ({
      id: r.idStaff,
      name: r.staff.name,
      month: r.month,
      year: r.year,
      prize: r.prize,
      prizeStatus: r.prizeStatus,
    }));
  }

  async showPrize() {
    const rows = await prisma.manageStaff.findMany({
      where: { prize: { not: null, gt: 0 }, prizeStatus: { not: null } },
      include: { staff: { select: { name: true } } },
    });
    return rows.map((r) => ({
      id: r.idStaff,
      name: r.staff.name,
      month: r.month,
      year: r.year,
      prize: r.prize,
      prizeStatus: r.prizeStatus,
    }));
  }

  async updatePrize(id, month, year, prize, prizeStatus) {
    try {
      const result = await prisma.manageStaff.updateMany({
        where: { idStaff: Number(id), month: Number(month), year: Number(year) },
        data: { prize: Number(prize), prizeStatus: Number(prizeStatus) },
      });
      return result.count > 0;
    } catch {
      return false;
    }
  }

  async setNullPrize(id, month, year) {
    try {
      const result = await prisma.manageStaff.updateMany({
        where: { idStaff: Number(id), month: Number(month), year: Number(year) },
        data: { prize: null, prizeStatus: null },
      });
      return result.count > 0;
    } catch {
      return false;
    }
  }

  async getStat() {
    const [countTeacher, countStudent, countStaff] = await Promise.all([
      prisma.teacher.count(),
      prisma.student.count(),
      prisma.staff.count(),
    ]);
    return { countTeacher, countStudent, countStaff };
  }
}

module.exports = new Staff();
