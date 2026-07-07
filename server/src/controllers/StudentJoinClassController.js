const StudentJoinClass = require('../models/StudentJoinClass');

class StudentJoinClassController {
  async getStudentJoinClasses(req, res) {
    try {
      const result = await StudentJoinClass.getStudentJoinClasses();
      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có học viên' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getStudentJoinClass(req, res) {
    try {
      const result = await StudentJoinClass.getStudentJoinClass(res.user.id);
      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có học viên' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async addStudentJoinClass(req, res) {
    try {
      const { idStudent, idClass } = req.body;
      if (!idStudent || idStudent == '') {
        return { success: false, check: false, msg: 'idStudent is required' };
      }
      if (!idClass || idClass == '') {
        return { success: false, check: false, msg: 'idClass is required' };
      } else {
        const queryResult = await StudentJoinClass.addStudentJoinClass(idStudent, idClass);

        if (queryResult) {
          return res.json({
            check: true,
          });
        } else {
          return res.status(400).json({ check: false, msg: 'Lớp học đã có giáo viên' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  // async editStudentJoinClass(req, res) {
  //   try {
  //     const {
  //       id,
  //       idStudent,
  //       idClass,
  //       attendDate,
  //       rating,
  //       paidStatus,
  //       prize,
  //       prizeStatus,
  //     } = req.body;
  //     if (!id || id == "") {
  //       return res
  //         .status(400)
  //         .json({ check: false, msg: "Hãy chọn giáo viên cần chỉnh sửa" });
  //     }
  //     if (!idStudent || idStudent == "") {
  //       return res
  //         .status(400)
  //         .json({ check: false, msg: "Hãy chọn giáo viên cần chỉnh sửa" });
  //     }
  //     if (!idClass || idClass == "") {
  //       return res
  //         .status(400)
  //         .json({ check: false, msg: "Hãy chọn lớp cần chỉnh sửa" });
  //     }
  //     if (
  //       (idStudent && idStudent !== "") ||
  //       (idClass && idClass !== "") ||
  //       (attendDate && attendDate !== "") ||
  //       (rating && rating !== "") ||
  //       (paidStatus && paidStatus !== "") ||
  //       (prize && prize !== "") ||
  //       (prizeStatus && prizeStatus !== "")
  //     ) {
  //       const queryResult = await StudentJoinClass.editStudentJoinClass(
  //         idStudent,
  //         idClass,
  //         attendDate,
  //         rating,
  //         paidStatus,
  //         prize,
  //         prizeStatus,
  //         id
  //       );

  //       if (queryResult) {
  //         return res.json({
  //           check: true,
  //         });
  //       } else {
  //         return res
  //           .status(400)
  //           .json({ check: false, msg: "Dữ liệu không thay đổi" });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return res.status(500).json({ check: false, msg: req.t('server.error') });
  //   }
  // }
  async getNullClass(req, res, next) {
    try {
      const result = await StudentJoinClass.getNullClass();
      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có lớp học' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getNullPrize(req, res, next) {
    try {
      const result = await StudentJoinClass.getNullPrize();
      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có lớp học' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getNullSalary(req, res, next) {
    try {
      const result = await StudentJoinClass.getNullSalary();
      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có lớp học' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getPrize(req, res, next) {
    try {
      const result = await StudentJoinClass.getPrize();
      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có lớp học' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getSalary(req, res, next) {
    try {
      const result = await StudentJoinClass.getSalary();
      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có lớp học' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getNullRating(req, res, next) {
    try {
      const result = await StudentJoinClass.getNullRating();
      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có lớp học' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async updateDate(req, res) {
    try {
      const { id, idClass, attendDate, status } = req.body;
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần chỉnh sửa' });
      }
      if (!attendDate || attendDate == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập ngày' });
      }
      // if (!status || status == "") {
      //   return res
      //     .status(400)
      //     .json({ check: false, msg: "Hãy nhập trạng thái" });
      // }
      if (!idClass || idClass == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập lớp' });
      } else {
        const queryResult = await StudentJoinClass.updateDate(attendDate, status, id, idClass);
        if (queryResult === -1) {
          return res.status(400).json({ check: false, msg: 'Số buổi không hợp lệ' });
        }
        if (queryResult) {
          return res.json({
            check: true,
          });
        } else {
          return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async updateRating(req, res) {
    try {
      const { id, listening, writing, speaking, reading } = req.body;
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn học viên cần chỉnh sửa' });
      }
      if (listening == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập điểm listening' });
      }
      if (speaking == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập điểm speaking' });
      }
      if (writing == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập điểm writing' });
      }
      if (reading == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập điểm reading' });
      } else {
        const queryResult = await StudentJoinClass.updateRating(
          listening,
          writing,
          speaking,
          reading,
          id
        );
        if (queryResult) {
          return res.json({
            check: true,
          });
        } else {
          return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async updateSalary(req, res) {
    try {
      const { id, paidStatus } = req.body;
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần chỉnh sửa' });
      }
      if (!paidStatus || paidStatus == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn trạng thái' });
      } else {
        const queryResult = await StudentJoinClass.updateSalary(paidStatus, id);
        if (queryResult) {
          return res.json({
            check: true,
          });
        } else {
          return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async updatePrize(req, res) {
    try {
      const { id, prizeStatus } = req.body;
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần chỉnh sửa' });
      }
      if (!prizeStatus || prizeStatus == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn trạng thái' });
      } else {
        const queryResult = await StudentJoinClass.updatePrize(prizeStatus, id);
        if (queryResult) {
          return res.json({
            check: true,
          });
        } else {
          return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async deleteSalary(req, res) {
    try {
      const { id } = req.body;
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần chỉnh sửa' });
      } else {
        const queryResult = await StudentJoinClass.deleteSalary(id);
        if (queryResult) {
          return res.json({
            check: true,
          });
        } else {
          return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async deletePrize(req, res) {
    try {
      const { id } = req.body;
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần chỉnh sửa' });
      } else {
        const queryResult = await StudentJoinClass.deletePrize(id);
        if (queryResult) {
          return res.json({
            check: true,
          });
        } else {
          return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async deleteStudentJoinClass(req, res) {
    try {
      const { id } = req.body;

      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần xóa' });
      }

      const queryResult = await StudentJoinClass.deleteStudentJoinClass(id);
      if (queryResult) {
        return res.json({
          check: true,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Giáo viên không dạy lớp này' });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
}

module.exports = new StudentJoinClassController();
