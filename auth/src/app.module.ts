import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DataBaseCore } from './repositories/config/database.module';

@Module({
  imports: [
    HealthModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseCore,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
