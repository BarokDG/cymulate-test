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

    await createdPhish.save();

    return;
  }

  findAll() {
    return this.phishModel.find();
  }

  findOne(id: string) {
    return this.phishModel.findById(id);
  }

  async update(id: string) {
    await this.phishModel.findByIdAndUpdate(id, { status: 'Successful' });
    return;
  }
}
