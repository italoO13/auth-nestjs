import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IUserRepository } from 'src/repositories/user/user.interface';
import UserRepository from 'src/repositories/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/repositories/entities/user.entity';
import { Encrypt } from 'src/utils/encrypt.utils';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

const provideJwt = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (config: ConfigService) => {
    return {
      global: true,
      secret: config.get('JWT_SECRET'),
      signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
    } as JwtModuleAsyncOptions;
  },
  inject: [ConfigService],
});

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity]), provideJwt],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    AuthService,
    Encrypt,
    AuthService,
  ],
  exports: [provideJwt],
})
export class AuthModule {}
