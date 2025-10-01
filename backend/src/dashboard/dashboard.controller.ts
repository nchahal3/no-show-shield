import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('analytics')
  async getAnalytics(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.dashboardService.getAnalytics(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('upcoming-bookings')
  async getUpcomingBookings(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.dashboardService.getUpcomingBookings(userId);
  }
}
