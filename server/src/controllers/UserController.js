const User = require('../models/User');
const Log = require('../models/Log'); // Fix: thiếu import Log
const { createApiKey } = require('../middleware/useApiKey');
const RegisterLog = require('../models/RegisterLog');
const { createHash, checkPassword } = require('../middleware/usePassword');

// Helper validate các trường bắt buộc
const validateRequired = (fields, res) => {
  for (const [value, msg] of fields) {
    if (!value || value === '') {
      res.status(400).json({ check: false, msg });
      return false;
    }
  }
  return true;
};

class UserController {
  /** Authenticate user and set API token cookie. */
  async login(req, res) {
    try {
      const { username, userpassword } = req.body;
      if (
        !validateRequired(
          [
            [username, req.t('auth.missingUsername')],
            [userpassword, req.t('auth.missingPassword')],
          ],
          res
        )
      )
        return;

      const queryResult = await User.getUser(username);
      if (!queryResult) {
        return res.status(404).json({ check: false, msg: req.t('auth.accountNotFound') });
      }

      const match = await checkPassword(userpassword, queryResult.password);
      if (!match) {
        return res.status(401).json({ check: false, msg: req.t('auth.wrongPassword') });
      }

      const token = createApiKey({ id: queryResult.id, role: queryResult.role });
      res.cookie('apitoken', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.COOKIE_SECURE === 'true',
        maxAge: 8 * 60 * 60 * 1000, // 8h — matches JWT_EXPIRES_IN
        path: '/',
      });

      return res.json({ check: true, role: queryResult.role });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  /** Return authenticated account profile info. */
  async getInfo(req, res) {
    try {
      const queryResult = await User.getInfo(res.user.id, res.user.role);
      if (!queryResult) {
        return res.status(404).json({ check: false, msg: req.t('auth.accountNotFound') });
      }
      return res.json({ check: true, data: queryResult });
    } catch (error) {
      console.error('GetInfo error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  /** Register a new account. */
  async addAccount(req, res) {
    try {
      const { username, userpassword, name, email, dob, sex, phone, address, role } = req.body;

      if (
        !validateRequired(
          [
            [username, req.t('auth.missingUsername')],
            [userpassword, req.t('auth.missingPassword')],
            [name, req.t('user.missingName')],
            [email, req.t('user.missingEmail')],
            [dob, req.t('user.missingDob')],
            [sex, req.t('user.missingSex')],
            [phone, req.t('user.missingPhone')],
            [address, req.t('user.missingAddress')],
            [role, req.t('user.missingRole')],
          ],
          res
        )
      )
        return;

      const password = await createHash(userpassword);
      const queryResult = await User.addUser(
        username,
        password,
        name,
        email,
        dob,
        sex,
        phone,
        address,
        role
      );

      if (!queryResult) {
        return res.status(400).json({ check: false, msg: req.t('auth.accountExists') });
      }

      await RegisterLog.addRegisterLog(email, Date.now(), username);
      return res.json({ check: true });
    } catch (error) {
      console.error('AddAccount error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  /** Update authenticated account profile fields. */
  async changeAccount(req, res) {
    try {
      const { name, email, dob, sex, phone, address } = req.body;

      if (
        !validateRequired(
          [
            [name, req.t('user.missingName')],
            [email, req.t('user.missingEmail')],
            [dob, req.t('user.missingDob')],
            [sex, req.t('user.missingSex')],
            [phone, req.t('user.missingPhone')],
            [address, req.t('user.missingAddress')],
          ],
          res
        )
      )
        return;

      // Fix: res.id.role → res.user.role
      const queryResult = await User.updateUser(
        res.user.id,
        name,
        email,
        dob,
        sex,
        phone,
        address,
        res.user.role
      );

      if (queryResult) {
        await Log.addLog(res.user.id, 'Chỉnh sửa tài khoản', Date.now(), true);
        return res.json({ check: true, msg: req.t('user.updateSuccess') });
      } else {
        await Log.addLog(res.user.id, 'Chỉnh sửa tài khoản', Date.now(), false);
        return res.status(400).json({ check: false, msg: req.t('user.updateNoChange') });
      }
    } catch (error) {
      await Log.addLog(res.user?.id, 'Chỉnh sửa tài khoản', Date.now(), false).catch(() => {});
      console.error('ChangeAccount error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
}

module.exports = new UserController();
