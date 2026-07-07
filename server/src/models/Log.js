const prisma = require('../config/prisma');

class Log {
  async getLogs() {
    const rows = await prisma.log.findMany({
      take: 100,
      orderBy: { id: 'desc' },
      include: { user: { select: { username: true, role: true } } },
    });
    return rows.map((l) => ({
      role: l.user.role,
      action: l.action,
      status: l.status,
      date: l.date,
      username: l.user.username,
    }));
  }

  async getLog(id) {
    const row = await prisma.log.findUnique({ where: { id: Number(id) } });
    return row ? [row] : [];
  }

  async addLog(idUser, action, date, status) {
    return prisma.log.create({
      data: { idUser: Number(idUser), action, date: new Date(date), status: Boolean(status) },
    });
  }
}

module.exports = new Log();
