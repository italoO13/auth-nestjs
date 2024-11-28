import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class ResponseFilterDto {
  @ApiProperty({ example: '11414716474' })
  @IsString()
  @IsOptional()
  cpf: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'teste@gmail.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  @Transform((deleted) => Boolean(deleted))
  deleted: boolean;
}
