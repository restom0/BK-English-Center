function serverErrorMessage(req) {
  return typeof req.t === 'function' ? req.t('server.error') : 'Server error';
}

function isBlank(value) {
  return value === undefined || value === null || value === '';
}

function ok(res, payload = {}) {
  return res.json({ check: true, ...payload });
}

function badRequest(res, msg) {
  return res.status(400).json({ check: false, msg });
}

function noChange(res, msg) {
  return badRequest(res, msg);
}

function handleError(req, res, error) {
  console.error('Error:', error);
  return res.status(500).json({ check: false, msg: serverErrorMessage(req) });
}

function createJoinClassController(options) {
  const controller = {};
  const { model, actions, methods, idField, messages } = options;

  async function readCollection(req, res, method, emptyMsg) {
    try {
      const result = await model[method]();
      if (!result) return badRequest(res, emptyMsg);
      return ok(res, { data: result });
    } catch (error) {
      return handleError(req, res, error);
    }
  }

  async function updateStatus(req, res, field, method) {
    try {
      const { id } = req.body;
      const value = req.body[field];
      if (isBlank(id)) return badRequest(res, messages.selectEdit);
      if (isBlank(value)) return badRequest(res, messages.selectStatus);

      const updated = await model[method](value, id);
      if (!updated) return noChange(res, messages.noChange);
      return ok(res);
    } catch (error) {
      return handleError(req, res, error);
    }
  }

  async function clearStatus(req, res, method) {
    try {
      const { id } = req.body;
      if (isBlank(id)) return badRequest(res, messages.selectEdit);

      const updated = await model[method](id);
      if (!updated) return noChange(res, messages.noChange);
      return ok(res);
    } catch (error) {
      return handleError(req, res, error);
    }
  }

  controller[actions.list] = function listJoinClasses(req, res) {
    return readCollection(req, res, methods.list, messages.emptyPerson);
  };

  controller[actions.getMine] = async function getJoinClass(req, res) {
    try {
      const result = await model[methods.getMine](res.user.id);
      if (!result) return badRequest(res, messages.emptyPerson);
      return ok(res, { data: result });
    } catch (error) {
      return handleError(req, res, error);
    }
  };

  controller[actions.add] = async function addJoinClass(req, res) {
    try {
      const subjectId = req.body[idField];
      const { idClass } = req.body;
      if (isBlank(subjectId)) return badRequest(res, `${idField} is required`);
      if (isBlank(idClass)) return badRequest(res, 'idClass is required');

      const added = await model[methods.add](subjectId, idClass);
      if (!added) return badRequest(res, messages.duplicateClass);
      return ok(res);
    } catch (error) {
      return handleError(req, res, error);
    }
  };

  [
    'getNullClass',
    'getNullPrize',
    'getNullSalary',
    'getPrize',
    'getSalary',
    'getNullRating',
  ].forEach((method) => {
    controller[method] = function readJoinClassCollection(req, res) {
      return readCollection(req, res, method, messages.emptyClass);
    };
  });

  controller.updateDate = async function updateDate(req, res) {
    try {
      const { id, idClass, attendDate, status } = req.body;
      if (isBlank(id)) return badRequest(res, messages.selectEdit);
      if (isBlank(attendDate)) return badRequest(res, messages.enterDate);
      if (isBlank(idClass)) return badRequest(res, messages.enterClass);

      const updated = await model.updateDate(attendDate, status, id, idClass);
      if (updated === -1) return badRequest(res, messages.invalidAttendDate);
      if (!updated) return noChange(res, messages.noChange);
      return ok(res);
    } catch (error) {
      return handleError(req, res, error);
    }
  };

  controller.updateRating = async function updateRating(req, res) {
    try {
      const { id } = req.body;
      if (isBlank(id)) return badRequest(res, messages.selectRating);
      for (const field of options.rating.fields) {
        if (isBlank(req.body[field])) return badRequest(res, options.rating.messages[field]);
      }

      const values = options.rating.fields.map((field) => req.body[field]);
      const updated = await model.updateRating(...values, id);
      if (!updated) return noChange(res, messages.noChange);
      return ok(res);
    } catch (error) {
      return handleError(req, res, error);
    }
  };

  controller.updateSalary = function updateSalary(req, res) {
    return updateStatus(req, res, 'paidStatus', 'updateSalary');
  };

  controller.updatePrize = function updatePrize(req, res) {
    return updateStatus(req, res, 'prizeStatus', 'updatePrize');
  };

  controller.deleteSalary = function deleteSalary(req, res) {
    return clearStatus(req, res, 'deleteSalary');
  };

  controller.deletePrize = function deletePrize(req, res) {
    return clearStatus(req, res, 'deletePrize');
  };

  controller[actions.deleteJoin] = async function deleteJoinClass(req, res) {
    try {
      const { id } = req.body;
      if (isBlank(id)) return badRequest(res, messages.selectDelete);

      const deleted = await model[methods.deleteJoin](id);
      if (!deleted) return badRequest(res, messages.notInClass);
      return ok(res);
    } catch (error) {
      return handleError(req, res, error);
    }
  };

  return controller;
}

module.exports = createJoinClassController;
