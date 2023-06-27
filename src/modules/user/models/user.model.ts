import * as mongoose from 'mongoose';
import { User } from '../user.interface';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 13;

export enum UserType {
  PERSON = 'PERSON',
  COMPANY = 'COMPANY',
}

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(UserType),
    default: UserType.PERSON,
  },
});

UserSchema.pre<User>('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
});
