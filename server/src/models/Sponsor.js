const prisma = require('../config/prisma');

class Sponsor {
  async getSponsors() {
    return prisma.sponsor.findMany();
  }

  async addSponsor(name, amount, status) {
    return prisma.sponsor.create({ data: { name, amount: Number(amount), status } });
  }

  async updateSponsor(id, name, amount, status) {
    try {
      const result = await prisma.sponsor.update({
        where: { id: Number(id) },
        data: { name, amount: Number(amount), status, version: { increment: 1 } },
      });
      return !!result;
    } catch {
      return false;
    }
  }

  async deleteSponsor(id) {
    try {
      await prisma.sponsor.delete({ where: { id: Number(id) } });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = new Sponsor();
