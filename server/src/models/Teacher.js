const prisma = require('../config/prisma');

class Teacher {
  async getTeachers() {
    const rows = await prisma.teacher.findMany({ include: { user: true } });
    return rows.map((t) => ({ ...t, ...t.user }));
  }

  async addTeacher(name, sex, dateOfBirth, phone, address, userId) {
    return prisma.teacher.create({
      data: { id: Number(userId), name, sex, dateofbirth: new Date(dateOfBirth), phone, address },
    });
  }

  async editTeacher(id, name, sex, dateofbirth, phone, address, email) {
    try {
      await prisma.user.update({ where: { id: Number(id) }, data: { email } });
      await prisma.teacher.update({
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
      return true;
    } catch {
      return false;
    }
  }

  async getTeacher(id) {
    return prisma.teacher.findUnique({ where: { id: Number(id) } });
  }

  async removeTeacher(id) {
    try {
      await prisma.user.delete({ where: { id: Number(id) } });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = new Teacher();
