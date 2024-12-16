import { NotificationMessage } from '../types/email.type';

export interface IEmailService {
  sendEmail(data: NotificationMessage): Promise<void>;
}

export const IEmailService = Symbol('IEmailService');
