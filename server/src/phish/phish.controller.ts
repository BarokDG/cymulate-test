import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PhishService } from './phish.service';
import { CreatePhishDto } from './dto/create-phish.dto';

@Controller('phish')
export class PhishController {
  constructor(private readonly phishService: PhishService) {}

  @Post()
  create(@Body() createPhishDto: CreatePhishDto) {
    return this.phishService.create(createPhishDto);
  }

  @Get()
  findAll() {
    return this.phishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phishService.findOne(id);
  }
}
