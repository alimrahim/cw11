import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'cw11',
      autoLoadEntities: true,
      synchronize: true,
    }),
    NewsModule,
    CommentsModule,
  ],
})
export class AppModule {}
