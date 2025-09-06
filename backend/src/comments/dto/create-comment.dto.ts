import {
  IsInt,
  IsPositive,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  newsId!: number;

  @IsOptional()
  @IsString()
  author?: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}
