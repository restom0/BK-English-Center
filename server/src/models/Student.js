const prisma = require('../config/prisma');

class Student {
  async getStudents() {
    const rows = await prisma.student.findMany({ include: { user: true } });
    return rows.map((s) => ({ ...s, ...s.user }));
  }

  async addStudent(name, sex, dateOfBirth, phone, address, userId) {
    return prisma.student.create({
      data: { id: Number(userId), name, sex, dateofbirth: new Date(dateOfBirth), phone, address },
    });
  }

  async editStudent(id, name, sex, dateofbirth, phone, address, email) {
    try {
      await prisma.user.update({ where: { id: Number(id) }, data: { email } });
      await prisma.student.update({
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

  async getStudent(id) {
    return prisma.student.findUnique({ where: { id: Number(id) } });
  }
}

module.exports = new Student();
