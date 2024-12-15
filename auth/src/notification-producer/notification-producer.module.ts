import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { NotificationProducerService } from './notification-producer.service';

dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'notification-mq-module',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.CONECTION_RMQ],
          queue: 'notification',
        },
      },
    ]),
  ],
  providers: [NotificationProducerService],
  exports: [NotificationProducerService],
})
export class NotificationProducerModule {}
