const RegisterLog = require('../models/RegisterLog');
class RegisterLogController {
  async getRegisterLogs(req, res, next) {
    try {
      const queryResult = await RegisterLog.getRegisterLogs();
      if (queryResult) {
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        return res.status(400).json({ check: false, error: 'Không có lịch sử đăng ký' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, error: req.t('server.error') });
    }
  }
  async getRegisterLog(req, res, next) {
    try {
      const { id } = req.query;
      const queryResult = await RegisterLog.getRegisterLog(id);
      if (queryResult) {
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        return res.status(400).json({ check: false, error: 'Không có lịch sử đăng ký' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, error: req.t('server.error') });
    }
  }
}
module.exports = new RegisterLogController();
