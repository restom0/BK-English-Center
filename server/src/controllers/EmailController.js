const Email = require('../models/Email');
const Log = require('../models/Log');
class EmailController {
  async getEmails(req, res, next) {
    try {
      const queryResult = await Email.getEmails();
      if (queryResult) {
        const result = await Log.addLog(
          res.user.id,
          'Xem danh sách email xác thực',
          Date.now(),
          true
        );
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        const result = await Log.addLog(
          res.user.id,
          'Xem danh sách email xác thực',
          Date.now(),
          false
        );
        return res.status(400).json({ check: false, msg: 'Không có email xác thực' });
      }
    } catch (error) {
      const result = await Log.addLog(
        res.user.id,
        'Xem danh sách email xác thực',
        Date.now(),
        false
      );
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async addEmail(req, res, next) {
    try {
      const { email, role } = req.body;
      if (!email || email === '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập email' });
      } else if (!role || role === '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập vai trò' });
      } else {
        const queryResult = await Email.addEmail(email, role);
        if (queryResult) {
          const result = await Log.addLog(res.user.id, 'Thêm email xác thực', Date.now(), true);
          return res.json({
            check: true,
          });
        } else {
          const result = await Log.addLog(res.user.id, 'Thêm email xác thực', Date.now(), false);
          return res.status(400).json({ check: false, msg: 'Email đã tồn tại' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Thêm email xác thực', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async editEmail(req, res, next) {
    try {
      const { id, email, role } = req.body;
      if (!id || id === '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn email' });
      } else if (!email || email === '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập email mới' });
      } else if (!role || role === '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập vai trò' });
      } else {
        const queryResult = await Email.updateEmail(id, email, role);
        if (queryResult) {
          const result = await Log.addLog(
            res.user.id,
            'Chỉnh sửa email xác thực',
            Date.now(),
            true
          );
          return res.json({
            check: true,
          });
        } else {
          const result = await Log.addLog(
            res.user.id,
            'Chỉnh sửa email xác thực',
            Date.now(),
            false
          );
          return res.status(400).json({ check: false, msg: req.t('user.updateNoChange') });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Chỉnh sửa email xác thực', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async removeEmail(req, res, next) {
    try {
      const { id } = req.query;
      const queryResult = await Email.deleteEmail(id);
      if (queryResult === -1) {
        const result = await Log.addLog(res.user.id, 'Xóa email xác thực', Date.now(), false);
        return res.status(400).json({
          check: false,
          msg: 'Đây là email gốc',
        });
      } else if (queryResult === 1) {
        const result = await Log.addLog(res.user.id, 'Xóa email xác thực', Date.now(), true);
        return res.json({
          check: true,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Xóa email xác thực', Date.now(), false);
        return res.status(400).json({ check: false, msg: 'Email không tồn tại' });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xóa email xác thực', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
}
module.exports = new EmailController();
