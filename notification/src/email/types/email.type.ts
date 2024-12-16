export type NotificationMessage = {
  email: string;
  subject: string;
  content: Record<string, string>;
  template: number;
};

export enum NotificationPattern {
  sendEmail = 'send-email',
}
