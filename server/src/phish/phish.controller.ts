import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PhishService } from './phish.service';
import { CreatePhishDto } from './dto/create-phish.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(AuthGuard)
@Controller('phish')
export class PhishController {
  constructor(private readonly phishService: PhishService) {}

  @Post()
  create(@Body() createPhishDto: CreatePhishDto) {
    return this.phishService.create(createPhishDto);
  }

  @Get()
  findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.phishService.findAll(limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phishService.findOne(id);
  }

  @Public()
  @Get('clicked/:id')
  updateStatus(@Param('id') id: string) {
    return this.phishService.update(id);
  }
}
