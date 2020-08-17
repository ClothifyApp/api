const UserService = require('../services/User');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

// Get all users
exports.list = async (req, res) => {
  try {
    const users = await UserService.list({});

    return okResponse(res, 200, { users });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Get one user
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const user = await UserService.getOne(id);

    return okResponse(res, 200, { user });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Create user
exports.create = async (req, res) => {
  const { phone, uuid } = req.body;

  if (!phone || !uuid) {
    return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
  }

  try {
    const newUSer = await UserService.create(phone, uuid);

    return okResponse(
      res,
      201,
      { user: newUSer },
      'Usuario creado correctamente'
    );
  } catch (err) {
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
};

// Update user
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, photoUrl, country, preferences } = req.body;

    if (!id, !fullName, !country) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const updatedUser = await UserService.update(id, fullName, photoUrl, country, preferences)

    return okResponse(res, 200, { updatedUser });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// Delete user
exports.delete = async (req, res) => {
  try {

    const { id } = req.params;    

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const deletedCount = await UserService.delete(id)

    return okResponse(res, 200, { deletedCount });
  } catch (err) {
    console.log('exports.list -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}
