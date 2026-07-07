const prisma = require('../config/prisma');

class EmailModel {
  async getEmails() {
    return prisma.email.findMany();
  }

  async addEmail(email, role) {
    try {
      await prisma.email.create({ data: { email, role } });
      return true;
    } catch {
      return false;
    }
  }

  async updateEmail(id, email, role) {
    try {
      const result = await prisma.email.update({
        where: { id: Number(id) },
        data: { email, role },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async deleteEmail(id) {
    if (Number(id) === 1) return -1;
    try {
      await prisma.email.delete({ where: { id: Number(id) } });
      return 1;
    } catch {
      return 0;
    }
  }
}

module.exports = new EmailModel();
