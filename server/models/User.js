const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: [true, 'username is require'],
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, 'username is require'],
  },
  username: {
    type: String,
    trim: true,
    required: [true, 'username is require'],
  },
  role: {
    type: String,
    enum: ['User', 'admin'],
    default: 'user',
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'email is require'],
  },
  profile_img: String,
  password: {
    type: String,
    trim: true,
    required: [true, 'password is require'],
    min: 6,
    max: 12,
  },
  passwordChangedAt: Date,
});

// pre save middleware
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});


/**
 * 
 * @param {string} inputpassword: req.body password
 * @param {string} userPassword: user instance password
 * @returns {boolean} true if password is password is correct, false if not
 * 
 */ 
userSchema.methods.comparepassword = async function (
  inputpassword,
  userpassword
) {
  return  bcrypt.compare(inputPassword, userPassword)
}

const User = mongoose.model('User', userSchema);
module.exports = User;
