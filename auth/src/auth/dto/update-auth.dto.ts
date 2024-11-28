import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/repositories/types/roles.type';

export class UpdateAuthDto {
  @ApiProperty({
    example: 'teste@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '11441764478',
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({
    example: 'Italo',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: Roles.EDITOR,
  })
  @IsOptional()
  @IsEnum(Roles)
  role?: Roles;
}
