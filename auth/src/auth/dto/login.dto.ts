import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Roles } from 'src/repositories/types/roles.type';

export class LoginDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class PayloadJwtDto {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  sub: number;

  @ApiProperty({
    example: 'teste@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: Roles.ADMIN,
  })
  @IsNotEmpty()
  @IsString()
  roles: Roles;

  @ApiProperty({
    example: '1732755766',
  })
  @IsNotEmpty()
  @IsString()
  iat: string;

  @ApiProperty({
    example: '1732842166',
  })
  @IsNotEmpty()
  @IsString()
  exp: string;
}
