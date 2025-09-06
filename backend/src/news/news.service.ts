import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { News } from './entities/news.entity';
import { Comment } from '../comments/entities/comment.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepo: Repository<News>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async findAll(): Promise<
    Array<{ id: number; title: string; image?: string; publishedAt: Date }>
  > {
    const items = await this.newsRepo.find({
      select: ['id', 'title', 'image', 'publishedAt'],
      order: { publishedAt: 'DESC' },
    });

    return items.map((i) => ({
      id: i.id,
      title: i.title,
      image: i.image ? `/uploads/${i.image}` : undefined,
      publishedAt: i.publishedAt,
    }));
  }

  async create(dto: CreateNewsDto, file?: Express.Multer.File): Promise<News> {
    const imageName = file?.filename;

    const entity = this.newsRepo.create({
      title: dto.title,
      content: dto.content,
      image: imageName,
    });
    return this.newsRepo.save(entity);
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepo.findOne({
      where: { id },
      relations: ['comments'],
    });

    if (!news) throw new NotFoundException(`News with id ${id} not found`);

    if (news.image) {
      news.image = `/uploads/${news.image}`;
    }

    return news;
  }

  async remove(id: number): Promise<void> {
    const news = await this.newsRepo.findOne({ where: { id } });

    if (news?.image) {
      const filePath = path.join(process.cwd(), 'uploads', news.image);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await this.commentRepo.delete({ newsId: id });
    const result: DeleteResult = await this.newsRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`News with id ${id} not found`);
    }
  }
}
