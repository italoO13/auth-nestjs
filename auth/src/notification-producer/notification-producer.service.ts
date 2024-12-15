import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  NotificationMessage,
  NotificationPattern,
} from './types/notification.type';

@Injectable()
export class NotificationProducerService {
  constructor(
    @Inject('notification-mq-module') private readonly client: ClientProxy,
  ) {}

  public async send(pattern: NotificationPattern, data: NotificationMessage) {
    try {
      this.client.emit(pattern, data).subscribe({
        error: (err) => console.log('Error Sending email:', err),
      });
    } catch (error) {
      new InternalServerErrorException('Error_queue_notification');
    }
  }
}
