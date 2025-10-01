import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Booking } from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';
import { EmailService } from '../utils/email';
import { TwilioService } from '../utils/twilio';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(
    private readonly bookingService: BookingService,
    private readonly emailService: EmailService,
    private readonly twilioService: TwilioService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handleDailyReminders() {
    const upcomingBookings = await this.bookingService.getUpcomingBookings();

    for (const booking of upcomingBookings) {
      await this.sendReminder(booking);
    }
  }

  async sendReminder(booking: Booking) {
    const message = `Reminder: You have an appointment scheduled for ${booking.appointmentDate.toISOString()}.`;

    if (booking.customerPhone) {
      await this.twilioService.sendSms(booking.customerPhone, message);
    } else {
      this.logger.debug(`Skipping SMS for booking ${booking.id}: no phone number.`);
    }

    if (booking.customerEmail) {
      await this.emailService.sendEmail(
        booking.customerEmail,
        'Appointment Reminder',
        `<p>${message}</p>`,
      );
    } else {
      this.logger.debug(`Skipping email for booking ${booking.id}: no email address.`);
    }
  }
}
