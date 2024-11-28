import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ResponseUserDto } from './response-user.dto';

export class ResponseLoginDto {
  @ApiProperty({ example: 'token' })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ example: ResponseUserDto })
  @IsNotEmpty()
  user: ResponseUserDto;

  constructor(token: string, user: ResponseUserDto) {
    this.token = token;
    this.user = user;
  }
}
