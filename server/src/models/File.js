const prisma = require('../config/prisma');

class FileModel {
  async getFiles() {
    const rows = await prisma.teacherHasFile.findMany({
      include: {
        teacher: { select: { name: true } },
        class: { select: { name: true } },
      },
    });
    return rows.map((f) => ({
      id: f.id,
      TeacherName: f.teacher.name,
      ClassName: f.class.name,
      idTeacher: f.idTeacher,
      fileName: f.fileName,
      filetype: f.filetype,
      fileAmount: f.fileAmount,
      fileStatus: f.fileStatus,
    }));
  }

  async addFile(idTeacher, idClass, fileName, filetype, fileAmount, fileStatus) {
    try {
      await prisma.teacherHasFile.create({
        data: {
          idTeacher: Number(idTeacher),
          idClass: Number(idClass),
          fileName,
          filetype,
          fileAmount: Number(fileAmount),
          fileStatus: Number(fileStatus),
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async updateFile(id, fileName, filetype, fileAmount, fileStatus) {
    try {
      await prisma.teacherHasFile.update({
        where: { id: Number(id) },
        data: {
          fileName,
          filetype,
          fileAmount: Number(fileAmount),
          fileStatus: Number(fileStatus),
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  async deleteFile(id) {
    try {
      await prisma.teacherHasFile.delete({ where: { id: Number(id) } });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = new FileModel();
