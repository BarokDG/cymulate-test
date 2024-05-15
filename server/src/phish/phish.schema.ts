import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhishDocument = HydratedDocument<Phish>;

@Schema({ timestamps: true })
export class Phish {
  @Prop({ required: true })
  recipient: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 'Pending' })
  status: 'Successful' | 'Pending';
}

export const PhishSchema = SchemaFactory.createForClass(Phish);
