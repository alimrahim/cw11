import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  BadRequestException,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(@Query('news_id') newsIdQuery?: string): Promise<Comment[]> {
    if (newsIdQuery === undefined) return this.commentsService.findAll();

    const parsed = Number(newsIdQuery);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new BadRequestException('news_id must be a positive integer');
    }
    return this.commentsService.findAll(parsed);
  }

  @Post()
  async create(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    dto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commentsService.remove(id);
  }
}
