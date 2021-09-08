const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/pictures');
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    callback(null, file.fieldname + '-' + uniqueSuffix + extname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, callback) => {
    let fileType = ['image/jpeg', 'image/png'];
    if (!fileType.includes(file.mimetype)) {
      return callback(
        new Error('file type not supported upload png, jpeg or jpg'),
        false
      );
    }

    return callback(null, true);
  },
});

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('posts/list.ejs', {
    title: 'posts',
  });
});

router.get('/create', (req, res, next) => {
  res.render('posts/create.ejs', {
    title: 'create post',
  });
});

router.post('/create', upload.single('image'), (req, res, next) => {
  res.send(req.file);
});
module.exports = router;
