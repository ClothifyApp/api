const User = require('../schema/User');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

exports.list = async (req, res) => {
  try {
    const users = await User.find({});

    return okResponse(res, 200, { users });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

exports.create = async (req, res) => {
  const { phone, fullName, country, uuid } = req.body;

  if (!phone || !uuid) {
    return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
  }

  try {
    const newUser = {
      phone,
      fullName,
      country,
      uuid,
    };

    await User.create(newUser);

    return okResponse(
      res,
      200,
      { user: newUser },
      'Usuario creado correctamente'
    );
  } catch (err) {
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};
