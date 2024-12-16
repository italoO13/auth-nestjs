import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationPattern } from './types/email.type';
import { EmailService } from './email.service';
import { IEmailService } from './interfaces/email-service.interface';
import { SendEmailDto } from './dto/send-email.dto';

@Controller()
export class EmailController {
  constructor(
    @Inject(EmailService)
    private readonly emailService: IEmailService,
  ) {}

  @EventPattern(NotificationPattern.sendEmail)
  sendEmail(@Payload() data: SendEmailDto, @Ctx() context: RmqContext) {
    console.log('Event received:', data);
    console.log('Context:', context);
    this.emailService.sendEmail(data);
  }
}
