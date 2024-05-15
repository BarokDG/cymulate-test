import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Phish } from './phish.schema';
import { CreatePhishDto } from './dto/create-phish.dto';

@Injectable()
export class PhishService {
  constructor(@InjectModel(Phish.name) private phishModel: Model<Phish>) {}

  async create(createPhishDto: CreatePhishDto) {
    const createdPhish = new this.phishModel(createPhishDto);
    const content = `<a href="http://localhost:5000/phishes/clicked/${createdPhish._id}" target="_blank">Click here</a>`;
    createdPhish.content = content;

    return createdPhish.save();
  }

  findAll() {
    return this.phishModel.find().exec();
  }

  findOne(id: string) {
    return this.phishModel.findById(id);
  }
}
