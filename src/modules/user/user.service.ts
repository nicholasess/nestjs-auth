import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user): Promise<User> {
    try {
      return new this.userModel(user).save();
    } catch (error) {
      return error;
    }
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findOne(email): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async list() {
    const result = await this.userModel.find();
    return result;
  }

  async update(user: User) {
    // ...
  }

  async remove(user: User) {
    // ...
  }
}
