import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Roles } from '../../repositories/types/roles.type';

export class CreateAuthDto {
  @ApiProperty({ example: 'teste@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'João Pedro' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '5581991072733' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]+$/, { message: 'Number invalid' })
  cpf: string;

  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  @IsNotEmpty()
  @IsIn([Roles.ADMIN, Roles.EDITOR, Roles.VIEWER])
  role: Roles;
}
