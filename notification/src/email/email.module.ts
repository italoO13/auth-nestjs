import { Module } from '@nestjs/common';
import { EmailProvideModule } from 'src/config/email.provider';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  controllers: [EmailController],
  imports: [EmailProvideModule.forRoot()],
  providers: [EmailService],
})
export class EmailModule {}
