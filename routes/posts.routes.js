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
    console.log(file)
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png';

    if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
      callback(null, true);
    } else {
      callbacak(new Error('file type not supported upload jpeg or png'));
    }
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

router.post('/create', (req, res, next) => {
  const image = upload.single('image');
  image(req, res, (err) => {
    if (err) {
      return new Error(err);
    }
    console.log(req.file);
  });
});
module.exports = router;
