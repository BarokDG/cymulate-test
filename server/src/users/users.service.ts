import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Document } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  findOne(email: string) {
    return this.usersModel.findOne({ email });
  }

  create(email: string, password: string) {
    const createdUser = new this.usersModel({
      email,
      password,
    });

    return createdUser.save();
  }
}
