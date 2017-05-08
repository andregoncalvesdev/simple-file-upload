var express = require('express');
var router = express.Router();
var multer = require('multer');
var mime = require('mime-types')

function getFileExtension(file) {
  return mime.extension(file.mimetype);
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + getFileExtension(file));
  }
})

var upload = multer({ storage: storage }).single('file');

router.post('/', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return;
    }

    // Everything went fine
    res.json({ success: true, message: 'file uploaded' });
  })
})

module.exports = router;
