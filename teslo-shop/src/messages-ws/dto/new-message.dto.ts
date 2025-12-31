import { IsString, MinLength } from 'class-validator';
export class NewMessageDto {
  from: string;
  to: string;

  @IsString()
  @MinLength(1)
  message: string;
}
