import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type TransportEmail =
  nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

export class EmailProvideModule {
  static forRoot(): DynamicModule {
    return {
      module: EmailProvideModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'EMAIL_PROVIDER',
          useFactory(configService: ConfigService) {
            const config = {
              host: configService.get('SMTP_HOST'),
              port: 587,
              secure: false,
              auth: {
                user: configService.get('SMTP_USER'),
                pass: configService.get('MAIL_APP_PASSWORD'),
              },
            } as SMTPTransport.Options;

            return nodemailer.createTransport(config);
          },
          inject: [ConfigService],
        },
      ],
      exports: ['EMAIL_PROVIDER'],
    };
  }
}
