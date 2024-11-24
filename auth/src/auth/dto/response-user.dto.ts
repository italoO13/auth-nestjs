import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/repositories/entities/user.entity';
import { Roles } from 'src/repositories/types/roles.type';

export class ResponseUserDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'fulano' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'fulano@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '1144171644' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: Roles.ADMIN })
  @IsEnum(Roles)
  @IsNotEmpty()
  roles: Roles;

  constructor(data: Partial<UserEntity>) {
    this.id = data.id;
    this.email = data.cpf;
    this.name = data.email;
    this.cpf = data.cpf;
    this.roles = data.role;
  }
}
