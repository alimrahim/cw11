import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { News } from '../news/entities/news.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepo: Repository<Comment>,
    @InjectRepository(News) private readonly newsRepo: Repository<News>,
  ) {}

  async findAll(newsId?: number): Promise<Comment[]> {
    if (newsId !== undefined) {
      return this.commentsRepo.find({
        where: { newsId },
        order: { id: 'ASC' },
      });
    }
    return this.commentsRepo.find({ order: { id: 'ASC' } });
  }

  async create(dto: CreateCommentDto): Promise<Comment> {
    const news = await this.newsRepo.findOne({ where: { id: dto.newsId } });
    if (!news) {
      throw new NotFoundException(`News with id ${dto.newsId} not found`);
    }

    const comment = this.commentsRepo.create({
      newsId: dto.newsId,
      author: dto.author ?? 'Anonymous',
      text: dto.text,
      news,
    });

    return this.commentsRepo.save(comment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.commentsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }
}
