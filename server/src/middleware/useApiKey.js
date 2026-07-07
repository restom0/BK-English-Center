require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Log = require('../models/Log');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';
const JWT_EXPIRES_IN = 8 * 60 * 60; // 8 giờ (giây)

// OTP counter - in-memory, reset khi restart server
// TODO: nên dùng Redis hoặc lưu DB cho production
let otpIndex = 1;

// ─── JWT ──────────────────────────────────────────────────────────────────────

const createApiKey = (data) => {
  return jwt.sign({ exp: Math.floor(Date.now() / 1000) + JWT_EXPIRES_IN, data }, JWT_SECRET);
};

// ─── Mail transporter ─────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: true,
});

// Helper gửi mail và ghi log
const dispatchMail = (mailData, logAction, userId, res) => {
  transporter.sendMail(mailData, async (error, info) => {
    await Log.addLog(userId, logAction, Date.now(), !error).catch(() => {});
    if (error) {
      return res.status(400).json({ check: false, msg: req.t('email.sendFailed') });
    }
    return res.status(200).json({ check: true, message: 'Mail sent', message_id: info.messageId });
  });
};

// ─── Middleware xác thực JWT ──────────────────────────────────────────────────

const ADMIN_ONLY_ROUTES = new Set([
  '/admins',
  '/course',
  '/register-logs',
  '/logs',
  '/sponsors',
  '/emails',
  '/staff',
  '/showtimekeeping',
  '/tempkeeping',
  '/salary',
  '/staff/null',
  '/prize',
  '/prize/null',
]);

const STAFF_AND_ABOVE_ROUTES = new Set([
  '/files',
  '/classes',
  '/sendPay',
  '/sendPrize',
  '/sendSalary',
  '/sendWarning',
  '/sendFile',
  '/sendCheer',
]);

const TEACHER_ROUTES = new Set(['/teachers', '/teacherjoinclasses']);
const STUDENT_ROUTES = new Set(['/students', '/studentjoinclasses']);

const requireApiKey = (req, res, next) => {
  // Prefer the httpOnly cookie; fall back to the Authorization header
  // for backward compatibility / non-browser API clients.
  const token =
    (req.cookies && req.cookies.apitoken) ||
    (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

  if (!token) {
    return res.status(403).json({ check: false, msg: req.t('auth.notLoggedIn') });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ check: false, msg: req.t('auth.invalidToken') });
    }

    const { role, id } = decoded.data;
    const base = req.baseUrl;

    if (role !== 'admin' && ADMIN_ONLY_ROUTES.has(base)) {
      return res.status(403).json({ check: false, msg: req.t('auth.noPermission') });
    }
    if (role !== 'staff' && role !== 'admin' && STAFF_AND_ABOVE_ROUTES.has(base)) {
      return res.status(403).json({ check: false, msg: req.t('auth.noPermission') });
    }
    if (!['staff', 'admin', 'teacher'].includes(role) && TEACHER_ROUTES.has(base)) {
      return res.status(403).json({ check: false, msg: req.t('auth.noPermission') });
    }
    if (!['staff', 'admin', 'student'].includes(role) && STUDENT_ROUTES.has(base)) {
      return res.status(403).json({ check: false, msg: req.t('auth.noPermission') });
    }

    try {
      const queryResult = await User.authUser(id, role);
      if (!queryResult) {
        return res.status(401).json({ check: false, msg: req.t('auth.accountNotFound') });
      }
      res.user = queryResult;
      next();
    } catch (dbErr) {
      console.error('Auth DB error:', dbErr);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  });
};

// ─── Middleware gửi mail OTP đăng ký ─────────────────────────────────────────

const sendMail = async (req, res) => {
  const { to, role } = req.query;
  const checkMail = await User.checkEmail(to, role);
  if (!checkMail) {
    return res.status(403).json({ check: false, msg: req.t('email.noPermission') });
  }

  const otpToken = createApiKey(otpIndex);
  const mailData = {
    from: 'BK English Center',
    to,
    subject: 'Đăng ký tài khoản',
    html: `
      <b>Chào bạn!</b><br/>
      <p>Đây là mã xác thực của bạn:</p>
      <p><b>${otpToken}</b></p>
      <p><i>Lưu ý: Vui lòng không chia sẻ với bất kì ai khác. Mã chỉ có tác dụng trong 5 phút và chỉ sử dụng được 1 lần.</i></p>
    `,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return res.status(400).json({ check: false, msg: req.t('email.sendFailed') });
    }
    res.status(200).json({ check: true, message: 'Mail sent', message_id: info.messageId });
  });
};

// ─── Middleware xác thực OTP ──────────────────────────────────────────────────

const requireOtp = (req, res, next) => {
  const { role } = req.body;
  if (role !== 'admin' && role !== 'staff') return next();

  if (!req.headers.authorization) {
    return res.status(403).json({ check: false, msg: req.t('email.noPermission') });
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || !decoded) {
      return res.status(404).json({ check: false, msg: req.t('email.noPermission') });
    }
    if (decoded.data === otpIndex) {
      otpIndex++;
      next();
    } else {
      return res.status(404).json({ check: false, msg: req.t('mail.invalidOtp') });
    }
  });
};

// ─── Mail handlers ────────────────────────────────────────────────────────────

const sendCheer = (req, res) =>
  dispatchMail(
    {
      from: 'BK English Center',
      to: req.query.to,
      subject: 'Tuyên dương',
      html: `<b>Chào bạn!</b><br/><p>Cảm ơn vì đã đồng hành cùng chúng tôi trong suốt thời gian qua.</p><p>Thật tốt khi được làm việc chung với bạn!</p>`,
    },
    req.t('mail.logCheer'),
    res.user.id,
    res
  );

const sendPay = (req, res) =>
  dispatchMail(
    {
      from: 'BK English Center',
      to: req.query.to,
      subject: 'Đóng tiền học phí',
      html: `<b>Chào bạn!</b><br/><p>Sau khi kiểm tra, chúng tôi thấy bạn chưa đóng tiền học phí. Hãy đến trung tâm gần nhất để thanh toán.</p>`,
    },
    req.t('mail.logPay'),
    res.user.id,
    res
  );

const sendSalary = (req, res) =>
  dispatchMail(
    {
      from: 'BK English Center',
      to: req.query.to,
      subject: 'Nhận lương',
      html: `<b>Chào bạn!</b><br/><p>Bạn đã có lương. Hãy đến trung tâm gần nhất để nhận.</p>`,
    },
    req.t('mail.logSalary'),
    res.user.id,
    res
  );

const sendPrize = (req, res) =>
  dispatchMail(
    {
      from: 'BK English Center',
      to: req.query.to,
      subject: 'Tuyên dương - Nhận thưởng',
      html: `<b>Chào bạn!</b><br/><p>Bạn đã nhận được phần thưởng của trung tâm. Hãy đến trung tâm để nhận thưởng.</p>`,
    },
    req.t('mail.logPrize'),
    res.user.id,
    res
  );

const sendWarning = (req, res) =>
  dispatchMail(
    {
      from: 'BK English Center',
      to: req.query.to,
      subject: 'Yêu cầu chấn chỉnh',
      html: `<b>Chào bạn!</b><br/><p>Hình như bạn đang có dấu hiệu đi xuống trong công việc. Nếu có điều gì cần trao đổi hãy liên hệ ngay với chúng tôi.</p>`,
    },
    req.t('mail.logWarning'),
    res.user.id,
    res
  );

const sendFile = (req, res) =>
  dispatchMail(
    {
      from: 'BK English Center',
      to: req.query.to,
      subject: 'Thông báo đến nhận sách',
      html: `<b>Chào bạn!</b><br/><p>Tài liệu bạn yêu cầu đã có. Hãy ghé trung tâm để nhận tài liệu.</p>`,
    },
    req.t('mail.logFile'),
    res.user.id,
    res
  );

module.exports = {
  requireApiKey,
  createApiKey,
  requireOtp,
  sendMail,
  sendCheer,
  sendPay,
  sendPrize,
  sendWarning,
  sendSalary,
  sendFile,
};
