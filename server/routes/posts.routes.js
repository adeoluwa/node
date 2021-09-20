const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const fs = require('fs');
const authController = require('../controller/authController')

const postController = require('../controller/postController')

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

router.use(postController.logMethod)

// RETRIEVE
router.get('/', authController.authorization,postController.getAllPost);

router.get('/:id', postController.getsinglepost );

// router.get('/', (req, res, next) => {
//   res.render('posts/list.ejs', {
//     title: 'posts',
//   });
// });

router.get('/create/post', (req, res, next) => {
  res.render('posts/create.ejs', {
    title: 'create post',
    server_url: req.server_url,
  });
});

router.post('/create/post', upload.single('image'), async (req, res, next) => {
  try {
    const { file, body } = req;
    const data = {
      image: `uploads/pictures/${file?.filename}`,
      ...body,
    };
    const post = await Post.create(data);
    res.send(post);
  } catch (error) {
    next(error);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById({ _id: id });
    console.log(post.image);
    fs.unlinkSync(post.image);
    await post.delete();
    res.redirect('/post');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
