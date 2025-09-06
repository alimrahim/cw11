import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { News } from '../../news/entities/news.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  newsId!: number;

  @Column({ default: 'Anonymous' })
  author!: string;

  @Column('text')
  text!: string;

  @ManyToOne(() => News, (news) => news.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'newsId' })
  news!: News;
}
