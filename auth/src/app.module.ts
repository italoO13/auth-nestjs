import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { provideDB } from './repositories/config/database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(provideDB),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
