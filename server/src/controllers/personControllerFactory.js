function serverErrorMessage(req, fallback = 'Server error') {
  return typeof req.t === 'function' ? req.t('server.error') : fallback;
}

function updateNoChangeMessage(req) {
  return typeof req.t === 'function' ? req.t('user.updateNoChange') : 'No changes were made';
}

function isBlank(value) {
  return value === undefined || value === null || value === '';
}

function publicPerson(row) {
  return {
    id: row.id,
    name: row.name,
    sex: row.sex,
    dateofbirth: row.dateofbirth,
    phone: row.phone,
    address: row.address,
    email: row.email,
  };
}

function validateFields(source, checks) {
  for (const check of checks) {
    if (isBlank(source[check.field])) return check.message;
  }
  return '';
}

function createPersonController(options) {
  const controller = {};
  const editFields = [
    { field: 'id', message: options.messages.selectEdit },
    { field: 'name', message: 'Hãy nhập tên' },
    { field: 'sex', message: 'Hãy chọn giới tính' },
    { field: 'dateofbirth', message: 'Hãy nhập ngày sinh' },
    { field: 'phone', message: 'Hãy nhập số điện thoại' },
    { field: 'address', message: 'Hãy nhập địa chỉ' },
    { field: 'email', message: 'Hãy nhập địa chỉ email' },
  ];

  controller[options.actions.list] = async function listPeople(req, res) {
    try {
      const rows = await options.model[options.modelMethods.list]();
      if (!rows) return res.status(400).json({ msg: options.messages.emptyList });
      return res.json({ check: true, data: rows.map(publicPerson) });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ msg: serverErrorMessage(req) });
    }
  };

  controller[options.actions.edit] = async function editPerson(req, res) {
    try {
      const message = validateFields(req.body, editFields);
      if (message) return res.status(400).json({ check: false, msg: message });

      const { id, name, sex, dateofbirth, phone, address, email } = req.body;
      const updated = await options.model[options.modelMethods.edit](
        id,
        name,
        sex,
        dateofbirth,
        phone,
        address,
        email
      );

      if (!updated) {
        return res.status(400).json({ check: false, msg: updateNoChangeMessage(req) });
      }
      return res.json({ check: true });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: serverErrorMessage(req) });
    }
  };

  controller[options.actions.remove] = async function removePerson(req, res) {
    try {
      const { id } = req.body;
      if (isBlank(id))
        return res.status(400).json({ check: false, msg: options.messages.selectRemove });

      const removed = await options.model[options.modelMethods.remove](id);
      if (!removed) return res.status(400).json({ check: false, msg: options.messages.notFound });
      return res.json({ check: true });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ check: false, msg: serverErrorMessage(req) });
    }
  };

  controller[options.actions.get] = async function getPerson(req, res) {
    try {
      const { id } = req.params;
      if (isBlank(id))
        return res.status(400).json({ check: false, msg: options.messages.selectGet });

      const person = await options.model[options.modelMethods.get](id);
      if (!person) return res.status(400).json({ check: false, msg: options.messages.invalidId });
      return res.json({ check: true, result: person });
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ check: false, msg: serverErrorMessage(req) });
    }
  };

  return controller;
}

module.exports = createPersonController;
