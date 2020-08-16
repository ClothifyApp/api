exports.acceptedExtensions = ['jpg', 'png', 'jpge'];
exports.maxImgSize = 3000000;

exports.jwtSecret = process.env.JWT_SECRET || 'SECRET';
exports.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '365d';

exports.errorsObj = {
  INTERNAL_ERROR: {
    httpCode: 400,
    message: 'Ha ocurrido un error interno, intenta más tarde.'
  },
  NOT_FOUND: {
    httpCode: 404,
    message: 'El recurso no existe o no tiene privilegios para acceder.'
  },
  MISSING_REQUIRED_FIELDS: {
    httpCode: 400,
    message: 'Faltan campos que son obligatorios.'
  },
  UPLOAD_ERR: {
    httpCode: 503,
    message: 'Hubo un error subiendo el archivo.'
  },
  UNSUPPORTED_EXTENSIONS: {
    httpCode: 400,
    message: 'Tipo de archivo no soportado.'
  },
  FILE_TOO_LARGE: {
    httpCode: 400,
    message: 'Los archivos deben pesar menos de ' + this.maxImgSize / 1000000 + ' MB.'
  },
  METHOD_NOT_ALLOWED: {
    httpCode: 405,
    message: 'Método no soportado.'
  },
  AUTHENTICATION_FAILED: {
    httpCode: 401,
    message: 'Ha ocurrido un error de autenticacion, inicie sesion de nuevo.'
  },
  NO_TOKEN_PROVIDED: {
    httpCode: 403,
    message: 'Inicie sesion de nuevo.'
  },
  UNAUTHORIZED: {
    httpCode: 401,
    message: 'El recurso no existe o necesitas privilegios para accederlo.'
  },
  MUST_COMPLETE_PROFILE: {
    httpCode: 403,
    message: 'Debe completar su perfil para acceder a esta funcionalidad.'
  },
  THE_END_OBJ: '',
};

// Errors Names
exports.errors = {
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  MISSING_REQUIRED_FIELDS: 'MISSING_REQUIRED_FIELDS',
  UPLOAD_ERR: 'UPLOAD_ERR',
  UNSUPPORTED_EXTENSIONS: 'UNSUPPORTED_EXTENSIONS',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
  NO_TOKEN_PROVIDED: 'NO_TOKEN_PROVIDED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  MUST_COMPLETE_PROFILE: 'MUST_COMPLETE_PROFILE',
  THE_END_NAMES: '',
};

exports.defaultError = {
  httpCode: 500,
  description: 'Ha ocurrido un error inesperado, intente mas tarde.',
};
