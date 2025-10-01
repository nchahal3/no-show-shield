import { Module } from '@nestjs/common';
import { BookingModule } from '../booking/booking.module';
import { EmailService } from '../utils/email';
import { TwilioService } from '../utils/twilio';
import { ReminderJob } from './reminder.job';
import { ReminderService } from './reminder.service';

@Module({
  imports: [BookingModule],
  providers: [ReminderService, ReminderJob, EmailService, TwilioService],
  exports: [ReminderService],
})
export class ReminderModule {}
