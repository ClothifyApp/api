const { upload } = require('../services/Image');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');

const singleUpload = upload.single('image');

// Upload one image to s3
exports.upload = async (req, res) => {
  try {
    singleUpload(req, res, async (err) => {
      if (err) {
        console.log('exports.upload -> err', err);
        return errorResponse(res, errors.UPLOAD_ERR, err);
      }
      const imagePath = req.file.location;

      return okResponse(res, 201, { imagePath });
    });
  } catch (error) {
    errorResponse(res, errors.UPLOAD_ERR, error);
  }
};
