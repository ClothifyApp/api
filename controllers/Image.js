const { upload } = require('../services/Image');
const { okResponse, errorResponse } = require('../utils/utils');
const { errors } = require('../utils/constants');
const singleUpload = upload.single("image");

// Upload one image to s3
exports.upload = async (req, res) => {
  try {
    singleUpload(req, res, async function (err) {
      if (err) {
        console.log('exports.upload -> err', err);
        return errorResponse(res, errors.UPLOAD_ERR , err)
      }
      let imagePath = req.file.location;
        
      okResponse(res, 201, { imagePath })
    });
} catch (error) {
  next(error)
}
}