import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { EMAIL_FROM, RESEND_API_KEY } from '../common/constants';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend = new Resend(RESEND_API_KEY);

  async sendEmail(to: string, subject: string, html: string) {
    try {
      return await this.resend.emails.send({
        from: EMAIL_FROM,
        to,
        subject,
        html,
      });
    } catch (error) {
      const err = error as Error;
      this.logger.error('Error sending email', err.stack);
      throw new Error('Email sending failed');
    }
  }
}
