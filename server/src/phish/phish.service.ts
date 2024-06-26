import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Phish } from './phish.schema';
import { CreatePhishDto } from './dto/create-phish.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PhishService {
  constructor(
    @InjectModel(Phish.name) private phishModel: Model<Phish>,
    private emailService: EmailService,
  ) {}

  async create(createPhishDto: CreatePhishDto) {
    const createdPhish = new this.phishModel(createPhishDto);
    const content = `<a href="http://localhost:3001/phish/clicked/${createdPhish._id}" target="_blank">Click here</a>`;
    createdPhish.content = content;

    await createdPhish.save();

    await this.emailService.sendMail(
      createPhishDto.recipient,
      'Hello',
      content,
    );

    return;
  }

  async findAll(limit: number, page: number) {
    const count = await this.phishModel.countDocuments();

    if (count === 0) {
      return {
        data: [],
        count: 0,
      };
    }

    const data = await this.phishModel
      .find()
      .sort({
        createdAt: 'desc',
      })
      .skip(limit * (page - 1))
      .limit(limit);

    return {
      data,
      count,
    };
  }

  findOne(id: string) {
    return this.phishModel.findById(id);
  }

  async update(id: string) {
    await this.phishModel.findByIdAndUpdate(id, { status: 'Successful' });
    return;
  }
}
