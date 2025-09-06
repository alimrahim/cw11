import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @Column({ nullable: true })
  image?: string;

  @CreateDateColumn({ name: 'published_at' })
  publishedAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.news, {
    cascade: ['insert', 'update'],
  })
  comments!: Comment[];
}
