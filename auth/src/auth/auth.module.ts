import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IUserRepository } from 'src/repositories/user/user.interface';
import UserRepository from 'src/repositories/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/repositories/entities/user.entity';
import { Encrypt } from 'src/utils/encrypt.utils';
@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    Encrypt,
    AuthService,
  ],
})
export class AuthModule {}
