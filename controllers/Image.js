const { upload } = require('../services/Image');
const singleUpload = upload.single("image")

// Upload one image to s3
exports.upload = async (req, res) => {
  try {
    singleUpload(req, res, async function (err) {
        if (err) {
          return res.json({
            success: false,
            errors: {
              title: "Image Upload Error",
              detail: err.message,
              error: err,
            },
          });
        }
        let imagePath = { imagePath: req.file.location };

        res.status(201).json({
            data: imagePath,
            message: 'image created',
        });
      });
} catch (error) {
    next(error)
}
}