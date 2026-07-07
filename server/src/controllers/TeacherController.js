const { token } = require('morgan');
const Teacher = require('../models/Teacher');

class TeacherController {
  // [GET] /teacher/
  async getTeachers(req, res, next) {
    try {
      const queryResult = await Teacher.getTeachers();
      var result = [];
      queryResult.forEach((el) => {
        var teacher = new Object();
        teacher.id = el.id;
        teacher.name = el.name;
        teacher.sex = el.sex;
        teacher.dateofbirth = el.dateofbirth;
        teacher.phone = el.phone;
        teacher.address = el.address;
        teacher.email = el.email;
        result.push(teacher);
      });
      if (queryResult) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ msg: 'Không có giáo viên' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }

  // // [POST] /teachers/add
  // async addTeacher(req, res, next) {
  //   try {
  //     const { name, sex, dateofbirth, phone, address } = req.body;
  //     if (!name || name == "") {
  //       return { check: false, msg: "name is required" };
  //     }
  //     if (!sex || sex == "") {
  //       return { check: false, msg: "sex is required" };
  //     }
  //     if (!dateofbirth || dateofbirth == "") {
  //       return { check: false, msg: "dateofbirth is required" };
  //     }
  //     if (!phone || phone == "") {
  //       return { check: false, msg: "phone is required" };
  //     }
  //     if (!address || address == "") {
  //       return { check: false, msg: "address is required" };
  //     }

  //     const queryResult = await Teacher.addTeacher(
  //       name,
  //       sex,
  //       dateofbirth,
  //       phone,
  //       address,
  //       userId
  //     );

  //     if (queryResult) {
  //       return { check: true };
  //     } else {
  //       return { check: false, msg: "Không có giáo viên" };
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return { check: false, msg: "Server error" };
  //   }
  // }

  // [PUT] /teachers/edit/:id
  async editTeacher(req, res) {
    try {
      const { id, name, sex, dateofbirth, phone, address, email } = req.body;
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần chỉnh sửa' });
      }
      if (!name || name == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập tên' });
      }
      if (!sex || sex == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giới tính' });
      }
      if (!dateofbirth || dateofbirth == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập ngày sinh' });
      }
      if (!phone || phone == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập số điện thoại' });
      }
      if (!address || address == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập địa chỉ' });
      }
      if (!email || email == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập địa chỉ email' });
      }
      const queryResult = await Teacher.editTeacher(
        id,
        name,
        sex,
        dateofbirth,
        phone,
        address,
        email
      );
      if (queryResult) {
        return res.json({
          check: true,
        });
      } else {
        return res.status(400).json({ check: false, msg: req.t('user.updateNoChange') });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  // [DELETE] /teachers/delete/:id
  async removeTeacher(req, res) {
    try {
      const { id } = req.body;

      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần xóa' });
      }

      const queryResult = await Teacher.removeTeacher(id);
      if (queryResult) {
        return res.json({
          check: true,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có giáo viên' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: 'Server error' });
    }
  }

  // [GET] /teacher/get/:id
  async getTeacher(req, res) {
    try {
      const { id } = req.params;

      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Teacher ID is required' });
      }

      const teacher = await Teacher.getTeacher(id);

      if (teacher) {
        return res.json({
          check: true,
          result: teacher,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Invalid Teacher ID' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: 'Server error' });
    }
  }
}

module.exports = new TeacherController();
