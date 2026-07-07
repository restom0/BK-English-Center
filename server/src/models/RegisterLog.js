const prisma = require('../config/prisma');

class RegisterLog {
  async getRegisterLogs() {
    const rows = await prisma.registerLog.findMany({
      take: 100,
      orderBy: { date: 'desc' },
      include: { user: { select: { username: true, email: true, role: true } } },
    });
    return rows.map((r) => ({
      username: r.user.username,
      email: r.user.email,
      date: r.date,
      role: r.user.role,
    }));
  }

  async getRegisterLog(id) {
    const rows = await prisma.registerLog.findMany({
      where: { idUser: Number(id) },
      include: { user: { select: { username: true, email: true, role: true } } },
    });
    return rows.map((r) => ({
      username: r.user.username,
      email: r.user.email,
      date: r.date,
      role: r.user.role,
    }));
  }

  async addRegisterLog(email, date, username) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return null;
    return prisma.registerLog.create({
      data: { idUser: user.id, email, date: new Date(date) },
    });
  }
}

module.exports = new RegisterLog();
