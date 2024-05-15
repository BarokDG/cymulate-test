import { PartialType } from '@nestjs/mapped-types';
import { CreatePhishDto } from './create-phish.dto';

export class UpdatePhishDto extends PartialType(CreatePhishDto) {}
