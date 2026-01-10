import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @Min(0)
  @IsInt()
  @IsOptional()
  offset: number;
}
