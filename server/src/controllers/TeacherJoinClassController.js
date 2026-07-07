const TeacherJoinClass = require('../models/TeacherJoinClass');

class TeacherJoinClassController {
  async getTeacherJoinClasses(req, res) {
    try {
      const result = await TeacherJoinClass.getTeacherJoinClasses();

      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có giáo viên' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async getTeacherJoinClass(req, res) {
    try {
      const result = await TeacherJoinClass.getTeacherJoinClass(res.user.id);
      if (result) {
        return res.json({
          check: true,
          data: result,
        });
      } else {
        return res.status(400).json({ check: false, msg: 'Không có giáo viên' });
      }
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async addTeacherJoinClass(req, res) {
    try {
      const { idTeacher, idClass } = req.body;
      if (!idTeacher || idTeacher == '') {
        return { success: false, check: false, msg: 'idTeacher is required' };
      }
      if (!idClass || idClass == '') {
        return { success: false, check: false, msg: 'idClass is required' };
      } else {
        const queryResult = await TeacherJoinClass.addTeacherJoinClass(idTeacher, idClass);

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

  // async editTeacherJoinClass(req, res) {
  //   try {
  //     const {
  //       id,
  //       idTeacher,
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
  //     if (!idTeacher || idTeacher == "") {
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
  //       (idTeacher && idTeacher !== "") ||
  //       (idClass && idClass !== "") ||
  //       (attendDate && attendDate !== "") ||
  //       (rating && rating !== "") ||
  //       (paidStatus && paidStatus !== "") ||
  //       (prize && prize !== "") ||
  //       (prizeStatus && prizeStatus !== "")
  //     ) {
  //       const queryResult = await TeacherJoinClass.editTeacherJoinClass(
  //         idTeacher,
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
      const result = await TeacherJoinClass.getNullClass();
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
      const result = await TeacherJoinClass.getNullPrize();
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
      const result = await TeacherJoinClass.getNullSalary();
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
      const result = await TeacherJoinClass.getPrize();
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
      const result = await TeacherJoinClass.getSalary();
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
      const result = await TeacherJoinClass.getNullRating();
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
        const queryResult = await TeacherJoinClass.updateDate(attendDate, status, id, idClass);
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
      const { id, rating } = req.body;
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần chỉnh sửa' });
      }
      if (!rating || rating == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập đánh giá' });
      } else {
        const queryResult = await TeacherJoinClass.updateRating(rating, id);
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
        const queryResult = await TeacherJoinClass.updateSalary(paidStatus, id);
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
        const queryResult = await TeacherJoinClass.updatePrize(prizeStatus, id);
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
        const queryResult = await TeacherJoinClass.deleteSalary(id);
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
        const queryResult = await TeacherJoinClass.deletePrize(id);
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
  async deleteTeacherJoinClass(req, res) {
    try {
      const { id } = req.body;

      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn giáo viên cần xóa' });
      }

      const queryResult = await TeacherJoinClass.deleteTeacherJoinClass(id);
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

module.exports = new TeacherJoinClassController();
