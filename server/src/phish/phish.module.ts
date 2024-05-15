import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishService } from './phish.service';
import { PhishController } from './phish.controller';
import { Phish, PhishSchema } from './phish.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Phish.name, schema: PhishSchema }]),
  ],
  controllers: [PhishController],
  providers: [PhishService],
})
export class PhishModule {}
