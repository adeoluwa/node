// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res, next) => {
  try {
    const { body } = req;
    const userExist = await User.findOne({ email: body.email });
    if (userExist) {
      return next(body.email + 'is taken');
    }

    const user = new User({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      username: body.username,
      password: body.password,
      role: body?.role,
    });

    await user.save();
    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// authentication
exports.login = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return next(new Error('user does not exist '));
    }

    const comparePassword = await user.comparePassword(
      body.password,
      user.password
    );

    if (!comparePassword) {
      return next(new Error('incorrect credentials'));
    }
    user.password = undefined;
    let token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      data: user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.authorization = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startswith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new Error('please login to view this resource'));
    }

    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById({ _id: decoded.id });

    if (!currentUser) {
      return next(new Error('user does not exist'));
    }

    req.user = currentUsser;
    return next();
  } catch (error) {
    return next(error);
  }
};
