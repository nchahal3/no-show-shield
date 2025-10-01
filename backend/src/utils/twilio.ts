import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from '../common/constants';

@Injectable()
export class TwilioService {
  private readonly logger = new Logger(TwilioService.name);
  private readonly client: Twilio | null;

  constructor() {
    const credentialsConfigured =
      !!TWILIO_ACCOUNT_SID &&
      !!TWILIO_AUTH_TOKEN &&
      !TWILIO_ACCOUNT_SID.startsWith('your_') &&
      !TWILIO_AUTH_TOKEN.startsWith('your_');

    if (credentialsConfigured) {
      this.client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    } else {
      this.logger.warn('Twilio credentials are not configured; SMS notifications are disabled.');
      this.client = null;
    }
  }

  async sendSms(to: string, body: string) {
    if (!this.client) {
      this.logger.debug(`SMS to ${to} skipped: Twilio not configured.`);
      return;
    }

    try {
      await this.client.messages.create({
        to,
        from: TWILIO_PHONE_NUMBER,
        body,
      });
    } catch (error) {
      const err = error as Error;
      this.logger.error('Failed to send SMS', err.stack);
      throw new Error('SMS sending failed');
    }
  }
}
