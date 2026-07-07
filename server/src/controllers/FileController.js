const File = require('../models/File');
const Log = require('../models/Log');
class FileController {
  async getFiles(req, res, next) {
    try {
      const queryResult = await File.getFiles();
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Xem danh sách tài liệu', Date.now(), true);
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Xem danh sách tài liệu', Date.now(), false);
        return res.status(400).json({ check: false, msg: 'Không có tài liệu' });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xem danh sách tài liệu', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async addFile(req, res, next) {
    try {
      const { idTeacher, idClass, fileName, filetype, fileAmount, fileStatus } = req.body;
      if (!idTeacher || idTeacher === '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên' });
      } else if (!idClass || idClass === '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn lớp' });
      } else if (!fileName || fileName === '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập tên tài liệu' });
      } else if (!fileStatus || fileStatus === '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn trạng thái' });
      } else if (!filetype || filetype === '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập loại tài liệu' });
      } else if (!fileAmount || fileAmount === '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập số lượng tài liệu' });
      } else {
        const queryResult = await File.addFile(
          idTeacher,
          idClass,
          fileName,
          filetype,
          fileAmount,
          fileStatus
        );
        if (queryResult) {
          const result = await Log.addLog(res.user.id, 'Thêm tài liệu', Date.now(), true);
          return res.json({
            check: true,
          });
        } else {
          const result = await Log.addLog(res.user.id, 'Thêm tài liệu', Date.now(), false);
          return res.status(400).json({ check: false, msg: 'Giáo viên chưa đăng kí lớp' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xem tài liệu', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async editFile(req, res, next) {
    try {
      const { id, fileName, filetype, fileAmount, fileStatus } = req.body;
      const queryResult = await File.updateFile(id, fileName, filetype, fileAmount, fileStatus);
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Chỉnh sửa tài liệu', Date.now(), true);
        return res.json({
          check: true,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Chỉnh sửa tài liệu', Date.now(), false);
        return res.status(400).json({ check: false, msg: req.t('user.updateNoChange') });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Chỉnh sửa tài liệu', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async removeFile(req, res, next) {
    try {
      const { id } = req.query;
      const queryResult = await File.deleteFile(id);
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Xem tài liệu', Date.now(), true);
        return res.json({
          check: true,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Xóa tài liệu', Date.now(), false);
        return res.status(400).json({ check: false, msg: 'Tài liệu không tồn tại' });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xóa tài liệu', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
}
module.exports = new FileController();
