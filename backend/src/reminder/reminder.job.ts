import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ReminderService } from './reminder.service';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class ReminderJob {
  constructor(
    private readonly reminderService: ReminderService,
    private readonly bookingService: BookingService,
  ) {}

  @Cron('0 8 * * *') // Runs every day at 8 AM
  async handleReminderJob() {
    const upcomingBookings = await this.bookingService.getUpcomingBookings();
    for (const booking of upcomingBookings) {
      await this.reminderService.sendReminder(booking);
    }
  }
}