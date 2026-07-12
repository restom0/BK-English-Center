const Teacher = require('../models/Teacher');
const createPersonController = require('./personControllerFactory');

module.exports = createPersonController({
  model: Teacher,
  modelMethods: {
    list: 'getTeachers',
    edit: 'editTeacher',
    remove: 'removeTeacher',
    get: 'getTeacher',
  },
  actions: {
    list: 'getTeachers',
    edit: 'editTeacher',
    remove: 'removeTeacher',
    get: 'getTeacher',
  },
  messages: {
    emptyList: 'Không có giáo viên',
    selectEdit: 'Hãy chọn giáo viên cần chỉnh sửa',
    selectRemove: 'Hãy chọn giáo viên cần xóa',
    selectGet: 'Teacher ID is required',
    notFound: 'Không có giáo viên',
    invalidId: 'Invalid Teacher ID',
  },
});
