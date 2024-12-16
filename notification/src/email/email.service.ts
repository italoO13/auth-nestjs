import { Inject, Injectable } from '@nestjs/common';
import { NotificationMessage } from './types/email.type';
import { IEmailService } from './interfaces/email-service.interface';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { ConfigService } from '@nestjs/config';
import { GetTemplates } from 'src/templates/template';
import { TransportEmail } from 'src/config/email.provider';

Injectable();
export class EmailService implements IEmailService {
  constructor(
    @Inject('EMAIL_PROVIDER')
    private readonly smtpService: TransportEmail,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(data: NotificationMessage): Promise<void> {
    try {
      const mailOptions: MailOptions = {
        from: this.configService.get('MAIL_APP_EMAIL'),
        to: data.email,
        subject: data.subject,
        html: GetTemplates.renderTemplate(data.template, data.content),
      };
      const result = await this.smtpService.sendMail(mailOptions);
      console.log('email enviado', result);
    } catch (error) {
      throw new Error('error_when_notification');
    }
  }
}
