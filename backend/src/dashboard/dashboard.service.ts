import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingService } from '../booking/booking.service';
import { UserService } from '../user/user.service';

@Injectable()
export class DashboardService {
  private static readonly AVERAGE_BOOKING_VALUE = 100;

  constructor(
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
  ) {}

  async getUpcomingBookings(userId: number) {
    return this.bookingService.findUpcomingBookingsByUserId(userId);
  }

  async getAnalytics(userId: number) {
    const [user, bookings] = await Promise.all([
      this.userService.findById(userId),
      this.bookingService.findBookingsByUserId(userId),
    ]);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const totalDeposits = bookings.reduce((acc, booking) => acc + (Number(booking.depositAmount) || 0), 0);
    const noShowCount = bookings.filter(booking => booking.status === 'no-show').length;
    const upcomingBookings = bookings.filter(booking => booking.appointmentDate > new Date());

    return {
      user,
      totalDeposits,
      noShowCount,
      totalBookings: bookings.length,
      upcomingBookingsCount: upcomingBookings.length,
      revenueSavedPercentage: this.calculateRevenueSavedPercentage(totalDeposits, bookings.length),
    };
  }

  private calculateRevenueSavedPercentage(totalDeposits: number, totalBookings: number) {
    if (totalBookings === 0) return 0;
    return (totalDeposits / (totalBookings * DashboardService.AVERAGE_BOOKING_VALUE)) * 100;
  }
}
