const Sponsor = require('../models/Sponsor');
const Log = require('../models/Log');
class SponsorController {
  async getSponsors(req, res, next) {
    try {
      const queryResult = await Sponsor.getSponsors();
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Xem danh sách nhà tài trợ', Date.now(), true);
        return res.json({
          check: true,
          data: queryResult,
        });
      } else {
        const result = await Log.addLog(
          res.user.id,
          'Xem danh sách nhà tài trợ',
          Date.now(),
          false
        );
        return res.status(400).json({ check: false, error: 'Không có nhà tài trợ' });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xem danh sách nhà tài trợ', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, error: req.t('server.error') });
    }
  }
  async addSponsor(req, res, next) {
    try {
      const { name, amount, status } = req.body;
      const queryResult = await Sponsor.addSponsor(name, amount, status);
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Thêm nhà tài trợ', Date.now(), true);
        return res.json({
          check: true,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Thêm nhà tài trợ', Date.now(), false);
        return res.status(400).json({ check: false, error: 'nhà tài trợ đã tồn tại' });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xem nhà tài trợ', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, error: req.t('server.error') });
    }
  }
  async editSponsor(req, res, next) {
    try {
      const { id, name, amount, status } = req.body;
      const queryResult = await Sponsor.updateSponsor(id, name, amount, status);
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Chỉnh sửa nhà tài trợ', Date.now(), true);
        return res.json({
          check: true,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Chỉnh sửa nhà tài trợ', Date.now(), false);
        return res.status(400).json({ check: false, error: req.t('sponsor.notFound') });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Chỉnh sửa nhà tài trợ', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, error: req.t('server.error') });
    }
  }
  async removeSponsor(req, res, next) {
    try {
      const { id } = req.query;
      const queryResult = await Sponsor.deleteSponsor(id);
      if (queryResult) {
        const result = await Log.addLog(res.user.id, 'Xem nhà tài trợ', Date.now(), true);
        return res.json({
          check: true,
        });
      } else {
        const result = await Log.addLog(res.user.id, 'Xóa nhà tài trợ', Date.now(), false);
        return res.status(400).json({ check: false, error: req.t('sponsor.notFound') });
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xóa nhà tài trợ', Date.now(), false);
      console.error('Error:', error);
      return res.status(500).json({ check: false, error: req.t('server.error') });
    }
  }
}
module.exports = new SponsorController();
