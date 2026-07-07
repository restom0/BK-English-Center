const Student = require('../models/Student');

class StudentController {
  // [GET] /student/
  async getStudents(req, res, next) {
    try {
      const queryResult = await Student.getStudents();
      var result = [];
      queryResult.forEach((el) => {
        var student = new Object();
        student.id = el.id;
        student.name = el.name;
        student.sex = el.sex;
        student.dateofbirth = el.dateofbirth;
        student.phone = el.phone;
        student.address = el.address;
        student.email = el.email;
        result.push(student);
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
      return res.status(500).json({ msg: req.t('server.error') });
    }
  }

  // // [POST] /students/add
  // async addStudent(req, res, next) {
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

  //     const queryResult = await Student.addStudent(
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
  //     return { check: false, msg: req.t('server.error') };
  //   }
  // }

  // [PUT] /students/edit/:id
  async editStudent(req, res) {
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
      const queryResult = await Student.editStudent(
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

  // [DELETE] /students/delete/:id
  async removeStudent(req, res) {
    try {
      const { id } = req.body;

      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần xóa' });
      }

      const queryResult = await Student.removeStudent(id);
      if (queryResult) {
        return res.json({
          check: true,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có giáo viên' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  // [GET] /student/get/:id
  async getStudent(req, res) {
    try {
      const { id } = req.params;

      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn học viên' });
      }

      const student = await Student.getStudent(id);

      if (student) {
        return res.json({
          check: true,
          result: student,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Invalid Student ID' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
}

module.exports = new StudentController();
