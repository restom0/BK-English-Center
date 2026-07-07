const { token } = require('morgan');
const Staff = require('../models/Staff');
const Log = require('../models/Log');

class StaffController {
  async getStat(req, res) {
    const queryResult = await Staff.getStat();
    if (queryResult) {
      const result = await Log.addLog(
        res.user.id,
        'tính tổng nhân viên, giáo viên, học sinh',
        Date.now(),
        true
      );
      return res.status(200).json({ check: true, data: queryResult });
    } else {
      const result = await Log.addLog(res.user.id, 'xem nhân viên', Date.now(), false);
      return res.status(400).json({
        check: false,
        msg: 'không có giáo viên, học sinh, nhân viên',
      });
    }
  }
  async showStaff(req, res) {
    const queryResult = await Staff.showStaff();
    if (queryResult) {
      const result = await Log.addLog(res.user.id, 'xem nhân viên', Date.now(), true);
      return res.status(200).json({ check: true, data: queryResult });
    } else {
      const result = await Log.addLog(res.user.id, 'xem nhân viên', Date.now(), false);
      return res.status(400).json({ check: false, msg: 'Không có nhân viên' });
    }
  }
  async updateStaff(req, res) {
    // return res.status(200).json({  message: "hello" });
    try {
      const { id, name, sex, dayofbirth, phone, address, email } = req.body;
      // if (!apitoken || apitoken == "") {
      // return res.status(400).json({ msg: "apitoken is required" });
      // }
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn nhân viên' });
      }
      if (!name || name == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập tên' });
      } else if (!sex || sex == '') {
        res.status(400).json({ check: false, msg: 'Hãy chọn giới tính' });
      } else if (!dayofbirth || dayofbirth == '') {
        res.status(400).json({ check: false, msg: 'Hãy nhập ngày sinh' });
      } else if (!phone || phone == '') {
        res.status(400).json({ check: false, msg: 'Hãy nhập số điện thoại' });
      } else if (!address || address == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập địa chỉ' });
      } else if (!email || email == '') {
        res.status(400).json({ check: false, msg: 'Hãy nhập email' });
      } else {
        //return res.status(400).json({msg: "vo day duoc"});
        const queryResult = await Staff.updateStaff(
          id,
          name,
          sex,
          dayofbirth,
          phone,
          address,
          email
        );
        console.log(queryResult);
        if (queryResult) {
          const result = await Log.addLog(res.user.id, 'sửa thông tin nhân viên', Date.now(), true);
          return res.status(200).json({ check: true });
        } else {
          const result = await Log.addLog(
            res.user.id,
            'sửa thông tin nhân viên',
            Date.now(),
            false
          );
          return res.status(400).json({ check: false, msg: 'Dữ liệu không thay đổi' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'sửa thông tin nhân viên', Date.now(), false);
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async deleteStaff(req, res) {
    try {
      const { id } = req.body;
      // if (!apitoken || apitoken == "") {
      // return res.status(400).json({ msg: "apitoken is required" });
      // }
      if (!id || id == '') {
        return res.status(400).json({ msg: 'id is required' });
      } else {
        //return res.status(400).json({msg: "vo day duoc"});
        const queryResult = await Staff.deleteStaff(id);
        if (queryResult) {
          const result = await Log.addLog(res.user.id, 'xóa nhân viên', Date.now(), true);
          return res.status(200).json({ check: true });
        } else {
          const result = await Log.addLog(res.user.id, 'xóa nhân viên', Date.now(), false);
          return res.status(400).json({ check: false, msg: req.t('staff.notFound') });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'xóa nhân viên', Date.now(), false);
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async showTimeKeeping(req, res) {
    const queryResult = await Staff.showTimeKeeping();
    if (queryResult) {
      const result = await Log.addLog(res.user.id, 'xem bảng chấm công', Date.now(), true);
      return res.status(200).json({ check: true, data: queryResult });
    } else {
      const result = await Log.addLog(res.user.id, 'xem bảng chấm công', Date.now(), false);
      return res.status(400).json({ check: false, msg: 'không có bảng chấm công' });
    }
  }
  async getTimeKeeping(req, res) {
    try {
      const { id } = req.query;
      if (!id || id === '') {
        return res.status(400).json({ msg: 'Hãy chọn nhân viên' });
      } else {
        const queryResult = await Staff.showTimeKeepingById(id);
        if (queryResult) {
          const result = await Log.addLog(res.user.id, 'Xem bảng chấm công', Date.now(), true);
          return res.status(200).json({ check: true, data: queryResult });
        } else {
          const result = await Log.addLog(res.user.id, 'xem bảng chấm công', Date.now(), false);
          return res.status(400).json({ check: false, msg: 'không có bảng chấm công' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Lấy thông tin nhân viên', Date.now(), false);
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  async addTimeKeeping(req, res) {
    try {
      const { id } = req.body;
      // if (!apitoken || apitoken == "") {
      // return res.status(400).json({ msg: "apitoken is required" });
      // }
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'id is required' });
      } else {
        //return res.status(400).json({msg: "vo day duoc"});
        const queryResult = await Staff.addTimeKeeping(id);
        console.log(queryResult);
        if (queryResult) {
          const result = await Log.addLog(res.user.id, 'chấm công cho nhân viên', Date.now(), true);
          return res.status(200).json({ check: true, msg: 'updated' });
        } else {
          const result = await Log.addLog(
            res.user.id,
            'chấm công cho nhân viên',
            Date.now(),
            false
          );
          return res.status(400).json({ check: false, msg: 'du lieu van giu nguyen!' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'chấm công cho nhân viên', Date.now(), false);
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: 'Server error' });
    }
  }
  async updateTimeKeeping(req, res) {
    try {
      const { id, month, year, attendDate } = req.body;
      // if (!apitoken || apitoken == "") {
      // return res.status(400).json({ msg: "apitoken is required" });
      // }
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn nhân viên' });
      } else if (!month || month == '') {
        res.status(400).json({ check: false, msg: 'Hãy nhập tháng' });
      } else if (!year || year == '') {
        res.status(400).json({ check: false, msg: 'Hãy nhập năm' });
      } else if (!attendDate || attendDate == '') {
        res.status(400).json({ check: false, msg: 'Hãy nhập số buổi' });
      } else {
        //return res.status(400).json({msg: "vo day duoc"});
        const queryResult = await Staff.updateTimeKeeping(
          Number(id),
          Number(month),
          Number(year),
          Number(attendDate)
        );
        if (queryResult) {
          const result = await Log.addLog(res.user.id, 'Thêm bảng chấm công', Date.now(), true);
          return res.status(200).json({ check: true });
        } else {
          const result = await Log.addLog(res.user.id, 'Thêm bảng chấm công', Date.now(), false);
          return res.status(400).json({ check: false, msg: req.t('user.updateNoChange') });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Sửa bảng chấm công', Date.now(), false);
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async insertManagestaff(req, res) {
    // them mot record moi voi id,month,year, cac gia tri khac la 0
    try {
      const { id, month, year } = req.body;
      // if (!apitoken || apitoken == "") {
      // return res.status(400).json({ msg: "apitoken is required" });
      // }
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn nhân viên' });
      } else if (!month || month == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập tháng' });
      } else if (!year || year == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập năm' });
      } else {
        //return res.status(400).json({msg: "vo day duoc"});
        const queryResult = await Staff.insertManagestaff(id, month, year);
        console.log(queryResult);
        if (queryResult) {
          const result = await Log.addLog(
            res.user.id,
            'Thêm bảng chấm công cho nhân viên',
            Date.now(),
            true
          );
          return res.status(200).json({ check: true, msg: 'Thêm thành công' });
        } else {
          const result = await Log.addLog(
            res.user.id,
            'Thêm bảng chấm công cho nhân viên',
            Date.now(),
            false
          );
          return res.status(400).json({ check: false, msg: 'Bảng chấm công đã tồn tại' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(
        res.user.id,
        'Thêm bảng chấm công cho nhân viên',
        Date.now(),
        false
      );
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: 'Ngày chấm công đã tồn tại' });
    }
  }
  async getSalary(req, res) {
    const queryResult = await Staff.getSalary();
    if (queryResult) {
      return res.status(200).json({ check: true, data: queryResult });
    } else {
      return res.status(400).json({ check: false, msg: 'Không có bảng lương cho nhân viên' });
    }
  }
  async getPrize(req, res) {
    const queryResult = await Staff.getPrize();
    if (queryResult) {
      return res.status(200).json({ check: true, data: queryResult });
    } else {
      return res.status(400).json({ check: false, msg: 'Không có bảng thưởng cho nhân viên' });
    }
  }
  async showSalary(req, res) {
    const queryResult = await Staff.showSalary();
    if (queryResult) {
      const result = await Log.addLog(res.user.id, 'xem lương của nhân viên', Date.now(), false);
      return res.status(200).json({ check: true, data: queryResult });
    } else {
      const result = await Log.addLog(res.user.id, 'xem lương của nhân viên', Date.now(), true);
      return res.status(400).json({ check: false, msg: 'Không có bảng lương cho nhân viên' });
    }
  }
  async updateSalary(req, res) {
    try {
      const { id, month, year, paid, paidStatus } = req.body;
      // if (!apitoken || apitoken == "") {
      // return res.status(400).json({ msg: "apitoken is required" });
      // }
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn nhân viên' });
      } else if (!month || month == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập tháng' });
      } else if (!year || year == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập năm' });
      } else if (!paid || paid == '') {
        return res.status(400).json({ check: false, msg: 'Hãy nhập lương' });
      } else if (!paidStatus || paidStatus == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn trạng thái' });
      } else {
        //return res.status(400).json({msg: "vo day duoc"});
        const queryResult = await Staff.updateSalary(id, month, year, paid, paidStatus);
        if (queryResult === 1) {
          const result = await Log.addLog(res.user.id, 'Sửa lương của nhân viên', Date.now(), true);
          return res.status(200).json({ check: true, msg: 'Chỉnh sửa thành công' });
        } else if (queryResult === 0) {
          const result = await Log.addLog(
            res.user.id,
            'Sửa lương của nhân viên',
            Date.now(),
            false
          );
          return res.status(400).json({ check: false, msg: req.t('user.updateNoChange') });
        } else {
          const result = await Log.addLog(
            res.user.id,
            'Sửa lương của nhân viên',
            Date.now(),
            false
          );
          return res.status(400).json({ check: false, msg: 'Dữ liệu không tồn tại' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Sửa lương của nhân viên', Date.now(), false);
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }
  async setNullSalary(req, res) {
    try {
      const { id, month, year } = req.body;
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn nhân viên' });
      } else if (!month || month == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn tháng' });
      } else if (!year || year == '') {
        return res.status(400).json({ check: false, msg: 'Hãy chọn năm' });
      } else {
        //return res.status(400).json({msg: "vo day duoc"});
        const queryResult = await Staff.setNullSalary(id, month, year);
        if (queryResult) {
          const result = await Log.addLog(res.user.id, 'Xóa lương của nhân viên', Date.now(), true);
          return res.status(200).json({ check: true, msg: 'Xóa thành công' });
        } else {
          const result = await Log.addLog(
            res.user.id,
            'Xóa lương của nhân viên',
            Date.now(),
            false
          );
          return res.status(400).json({ check: false, msg: 'nhan vien khong ton tai' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'Xóa lương của nhân viên', Date.now(), false);
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: req.t('server.error') });
    }
  }

  async showPrize(req, res) {
    const queryResult = await Staff.showPrize();
    if (queryResult) {
      const result = await Log.addLog(res.user.id, 'xem lương của nhân viên', Date.now(), true);
      return res.status(200).json({ check: true, data: queryResult });
    } else {
      const result = await Log.addLog(res.user.id, 'xem lương của nhân viên', Date.now(), false);
      return res.status(400).json({ check: false, msg: 'không có bảng lương nhân viên' });
    }
  }
  async updatePrize(req, res) {
    try {
      const { id, month, year, paid, paidStatus } = req.body;
      // if (!apitoken || apitoken == "") {
      // return res.status(400).json({ msg: "apitoken is required" });
      // }
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'id is required' });
      } else if (!month || month == '') {
        return res.status(400).json({ check: false, msg: 'month is required' });
      } else if (!year || year == '') {
        return res.status(400).json({ check: false, msg: 'year is required' });
      } else if (!paid || paid == '') {
        return res.status(400).json({ check: false, msg: 'paid is required' });
      } else if (!paidStatus || paidStatus == '') {
        return res.status(400).json({ check: false, msg: 'paidStatus is required' });
      } else {
        //return res.status(400).json({msg: "vo day duoc"});
        const queryResult = await Staff.updatePrize(id, month, year, paid, paidStatus);
        console.log(queryResult);
        if (queryResult) {
          const result = await Log.addLog(res.user.id, 'sửa lương của nhân viên', Date.now(), true);
          return res.status(200).json({ check: true, msg: 'updated' });
        } else {
          const result = await Log.addLog(
            res.user.id,
            'sửa lương của nhân viên',
            Date.now(),
            false
          );
          return res.status(400).json({ check: false, msg: 'du lieu van giu nguyen!' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'xem lương của nhân viên', Date.now(), false);
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: 'Server error' });
    }
  }
  async setNullPrize(req, res) {
    try {
      const { id, month, year } = req.body;
      // if (!apitoken || apitoken == "") {
      // return res.status(400).json({ msg: "apitoken is required" });
      // }
      if (!id || id == '') {
        return res.status(400).json({ check: false, msg: 'id is required' });
      } else if (!month || month == '') {
        return res.status(400).json({ check: false, msg: 'month is required' });
      } else if (!year || year == '') {
        return res.status(400).json({ check: false, msg: 'year is required' });
      } else {
        //return res.status(400).json({msg: "vo day duoc"});
        const queryResult = await Staff.setNullPrize(id, month, year);
        if (queryResult) {
          const result = await Log.addLog(
            res.user.id,
            'xóa lương của nhân viên',
            Date.now(),
            false
          );
          return res.status(200).json({ check: true, msg: 'updated' });
        } else {
          const result = await Log.addLog(
            res.user.id,
            'xóa lương của nhân viên',
            Date.now(),
            false
          );
          return res.status(400).json({ check: false, msg: 'nhan vien khong ton tai' });
        }
      }
    } catch (error) {
      const result = await Log.addLog(res.user.id, 'xóa lương của nhân viên', Date.now(), false);
      console.error('Error: ', error);
      return res.status(500).json({ check: false, msg: 'Server error' });
    }
  }
}

module.exports = new StaffController();
