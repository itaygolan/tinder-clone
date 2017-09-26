import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const UserSchema = new Schema({
  username: String,
  name: String,
  age: Number,
  avatar: String,
  password: String,
  email: {
    type: String,
    unique: true
  }
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next()
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  _authenticateUser(password) {
    return compareSync(password, this.password) // this.password is the hashed version
  },
  _createToken() {
    return jwt.sign(
      {
        _id: this._id // creates an encrypted token from the _id of the user
      },
      constants.JWT_SECRET
    );
  }
};

export default mongoose.model('User', UserSchema);
