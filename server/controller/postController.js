const Post = require('../models/Post');

exports.getAllPost = async (req, res, next) => {
  try {
    let posts = await Post.find();
    res.status(200).json({
      status: 'success',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getsinglepost = async (req, res, next) => {
  try {
    let { id } = req.params;
    let post = await Post.findById({ _id: id });
    res.status(200).json({
      status: 'success',
      post,
    });
  } catch (error) {
    next(error);
  }
};

exports.logMethod = (req, res, next) => {
  //....
  console.log(req.method, '/', req.get('host') + '/' + req.url);
  next();
};
