const StudentJoinClass = require('../models/StudentJoinClass');
const createJoinClassController = require('./joinClassControllerFactory');

module.exports = createJoinClassController({
  model: StudentJoinClass,
  idField: 'idStudent',
  actions: {
    list: 'getStudentJoinClasses',
    getMine: 'getStudentJoinClass',
    add: 'addStudentJoinClass',
    deleteJoin: 'deleteStudentJoinClass',
  },
  methods: {
    list: 'getStudentJoinClasses',
    getMine: 'getStudentJoinClass',
    add: 'addStudentJoinClass',
    deleteJoin: 'deleteStudentJoinClass',
  },
  rating: {
    fields: ['listening', 'writing', 'speaking', 'reading'],
    messages: {
      listening: 'Hãy nhập điểm listening',
      writing: 'Hãy nhập điểm writing',
      speaking: 'Hãy nhập điểm speaking',
      reading: 'Hãy nhập điểm reading',
    },
  },
  messages: {
    emptyPerson: 'Không có học viên',
    emptyClass: 'Không có lớp học',
    duplicateClass: 'Lớp học đã có học viên này',
    selectEdit: 'Hãy chọn học viên cần chỉnh sửa',
    selectRating: 'Hãy chọn học viên cần chỉnh sửa',
    selectDelete: 'Hãy chọn học viên cần xóa',
    enterDate: 'Hãy nhập ngày',
    enterClass: 'Hãy nhập lớp',
    selectStatus: 'Hãy chọn trạng thái',
    invalidAttendDate: 'Số buổi không hợp lệ',
    noChange: 'Dữ liệu không thay đổi',
    notInClass: 'Học viên không học lớp này',
  },
});
