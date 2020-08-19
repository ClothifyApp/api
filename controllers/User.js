const UserService = require('../services/User');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');
const firebase = require('../firebase/index');
const { generateToken } = require('../utils/utils');

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
    console.log('exports.getOne -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}

// SMS validation
exports.register = async (req, res) => {

  let isNew = false;
  
  const { code, verificationId } = req.body

  try {

    const credential = await firebase.auth.PhoneAuthProvider.credential(verificationId, code);
    const responseAuth = await firebase.auth().signInWithCredential(credential);

    let user = await UserService.getByUid(responseAuth.user.uid);
    
    if (!user) {
      isNew = true;
      user = await UserService.create(responseAuth.user.phoneNumber,responseAuth.user.uid);
    }
    
  
    const token = generateToken({
      id:user._id
    })

    const { phone, photoUrl, fullName, preferences , country }  = user

    return okResponse(
      res,
      200,
      { token , isNew , user: 
        {
          phone,
          photoUrl,
          fullName,
          preferences,
          country
        } 
      },
      'Usuario autenticado correctamente'
    );

  } catch (error) {

    console.error(error);
    errorResponse(res, errors.AUTHENTICATION_FAILED,error);

  }

};

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
    console.log('exports.create -> err', err);
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
    console.log('exports.update -> err', err);
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
    console.log('exports.delete -> err', err);
    errorResponse(res, errors.INTERNAL_ERROR, err);
  }
}
