const UserRouter = require('./user');
const StaffRouter = require('./staff');
const AdminRouter = require('./admin');
const ClassRouter = require('./class');
const CourseRouter = require('./course');
const RegisterLogRouter = require('./registerlog');
const LogRouter = require('./log');
const SponsorRouter = require('./sponsor');
const FileRouter = require('./file');
const EmailRouter = require('./email');
const MailRouter = require('./mail');
const TeacherJoinClass = require('./teacherjoinclass');
const TeacherRouter = require('./teacher');
const StudentJoinClass = require('./studentjoinclass');
const StudentRouter = require('./student');
const { requireApiKey } = require('../src/middleware/useApiKey');

function route(app) {
  // Public routes
  app.use('/users', UserRouter); // Fix: bỏ route /user trùng lặp
  app.use('/', MailRouter);
  app.use('/courses', CourseRouter);

  // Protected routes (yêu cầu JWT)
  app.use('/admins', requireApiKey, AdminRouter);
  app.use('/classes', requireApiKey, ClassRouter);
  app.use('/staffs', requireApiKey, StaffRouter);
  app.use('/register-logs', requireApiKey, RegisterLogRouter);
  app.use('/logs', requireApiKey, LogRouter);
  app.use('/sponsors', requireApiKey, SponsorRouter);
  app.use('/files', requireApiKey, FileRouter);
  app.use('/emails', requireApiKey, EmailRouter);
  app.use('/teachers', requireApiKey, TeacherRouter);
  app.use('/teacherjoinclasses', requireApiKey, TeacherJoinClass);
  app.use('/students', requireApiKey, StudentRouter);
  app.use('/studentjoinclasses', requireApiKey, StudentJoinClass);
}

module.exports = route;
