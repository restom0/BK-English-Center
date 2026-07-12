const Student = require('../models/Student');
const createPersonController = require('./personControllerFactory');

module.exports = createPersonController({
  model: Student,
  modelMethods: {
    list: 'getStudents',
    edit: 'editStudent',
    remove: 'removeStudent',
    get: 'getStudent',
  },
  actions: {
    list: 'getStudents',
    edit: 'editStudent',
    remove: 'removeStudent',
    get: 'getStudent',
  },
  messages: {
    emptyList: 'Không có học viên',
    selectEdit: 'Hãy chọn học viên cần chỉnh sửa',
    selectRemove: 'Hãy chọn học viên cần xóa',
    selectGet: 'Hãy chọn học viên',
    notFound: 'Không có học viên',
    invalidId: 'Invalid Student ID',
  },
});
