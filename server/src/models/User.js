const prisma = require('../config/prisma');

class User {
  async getUser(username) {
    return prisma.user.findUnique({ where: { username } });
  }

  async checkEmail(email, role) {
    const row = await prisma.email.findFirst({ where: { email, role } });
    return !!row;
  }

  async getInfo(id, role) {
    const include = { user: { select: { email: true } } };
    let profile;
    if (role === 'student') profile = await prisma.student.findUnique({ where: { id }, include });
    else if (role === 'teacher')
      profile = await prisma.teacher.findUnique({ where: { id }, include });
    else if (role === 'staff') profile = await prisma.staff.findUnique({ where: { id }, include });
    else if (role === 'admin') profile = await prisma.admin.findUnique({ where: { id }, include });
    else return null;
    if (!profile) return null;
    return {
      name: profile.name,
      sex: profile.sex,
      dateofbirth: profile.dateofbirth,
      phone: profile.phone,
      address: profile.address,
      email: profile.user.email,
      image: profile.image || null,
    };
  }

  async authUser(id, role) {
    return prisma.user.findFirst({ where: { id, role } });
  }

  async addUser(username, userpassword, name, email, dob, sex, phone, address, role) {
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) return null;

    const profileData = { name, sex, dateofbirth: new Date(dob), phone, address };

    return prisma.user.create({
      data: {
        username,
        password: userpassword,
        email,
        role,
        [role]: { create: profileData },
      },
    });
  }

  async updateUser(id, name, email, dob, sex, phone, address, role) {
    const profileData = { name, dateofbirth: new Date(dob), sex, phone, address };

    try {
      if (role === 'student')
        await prisma.student.update({
          where: { id },
          data: { ...profileData, version: { increment: 1 } },
        });
      else if (role === 'teacher')
        await prisma.teacher.update({
          where: { id },
          data: { ...profileData, version: { increment: 1 } },
        });
      else if (role === 'staff')
        await prisma.staff.update({
          where: { id },
          data: { ...profileData, version: { increment: 1 } },
        });
      else if (role === 'admin')
        await prisma.admin.update({
          where: { id },
          data: { ...profileData, version: { increment: 1 } },
        });
      else return false;

      await prisma.user.update({ where: { id }, data: { email } });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = new User();
