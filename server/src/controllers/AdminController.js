const Admin = require('../models/Admin');
const { requireApiKey } = require('../middleware/useApiKey');
const Log = require('../models/Log');
class AdminController {
  async getAdmin(req, res, next) {
    try {
      const queryResult = await Admin.getAdmin(res.user.id, res.user.role);
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Xem thông tin tài khoản', Date.now(), true);
        return res.json({
          check: true,
          data: {
            name: queryResult.name,
            sex: queryResult.sex,
            dateofbirth: queryResult.dateofbirth,
            phone: queryResult.phone,
            address: queryResult.address,
          },
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Xem thông tin tài khoản', Date.now(), false);
        return res.status(404).json({ check: false, msg: req.t('auth.accountNotFound') });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xem thông tin tài khoản', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getIncome(req, res, next) {
    try {
      const queryResult = await Admin.getIncome();
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Xem thu nhập', Date.now(), true);
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Xem thu nhập', Date.now(), false);
        return res.status(404).json({ check: false, msg: 'Không có lịch sử' });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xem thu nhập', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getOutcome(req, res, next) {
    try {
      const queryResult = await Admin.getOutcome();
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Xem chi phí', Date.now(), true);
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Xem chi phí', Date.now(), false);
        return res.status(404).json({ check: false, msg: 'Không có lịch sử' });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xem chi phí', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getStat(req, res, next) {
    try {
      const queryResult = await Admin.getStat();
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Xem số lượng truy cập', Date.now(), true);
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Xem số lượng truy cập', Date.now(), false);
        return res.status(404).json({ check: false, msg: 'Không có lịch sử' });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xem số lượng truy cập', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
}
module.exports = new AdminController();
