import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import type { News } from './entities/news.entity'; // Изменено на import type
import type { Express } from 'express'; // Изменено на import type

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(): Promise<
    Array<{ id: number; title: string; image?: string; publishedAt: Date }>
  > {
    return this.newsService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: CreateNewsDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<News> {
    return this.newsService.create(dto, file);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<News> {
    return this.newsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.newsService.remove(id);
  }
}
