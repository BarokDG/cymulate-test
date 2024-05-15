import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishService } from './phish.service';
import { PhishController } from './phish.controller';
import { Phish, PhishSchema } from './phish.schema';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Phish.name, schema: PhishSchema }]),
    EmailModule,
  ],
  controllers: [PhishController],
  providers: [PhishService],
})
export class PhishModule {}
