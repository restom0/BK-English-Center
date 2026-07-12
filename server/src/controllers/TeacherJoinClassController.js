const TeacherJoinClass = require('../models/TeacherJoinClass');
const createJoinClassController = require('./joinClassControllerFactory');

module.exports = createJoinClassController({
  model: TeacherJoinClass,
  idField: 'idTeacher',
  actions: {
    list: 'getTeacherJoinClasses',
    getMine: 'getTeacherJoinClass',
    add: 'addTeacherJoinClass',
    deleteJoin: 'deleteTeacherJoinClass',
  },
  methods: {
    list: 'getTeacherJoinClasses',
    getMine: 'getTeacherJoinClass',
    add: 'addTeacherJoinClass',
    deleteJoin: 'deleteTeacherJoinClass',
  },
  rating: {
    fields: ['rating'],
    messages: {
      rating: 'Hãy nhập đánh giá',
    },
  },
  messages: {
    emptyPerson: 'Không có giáo viên',
    emptyClass: 'Không có lớp học',
    duplicateClass: 'Lớp học đã có giáo viên',
    selectEdit: 'Hãy chọn giáo viên cần chỉnh sửa',
    selectRating: 'Hãy chọn giáo viên cần chỉnh sửa',
    selectDelete: 'Hãy chọn giáo viên cần xóa',
    enterDate: 'Hãy nhập ngày',
    enterClass: 'Hãy nhập lớp',
    selectStatus: 'Hãy chọn trạng thái',
    invalidAttendDate: 'Số buổi không hợp lệ',
    noChange: 'Dữ liệu không thay đổi',
    notInClass: 'Giáo viên không dạy lớp này',
  },
});
