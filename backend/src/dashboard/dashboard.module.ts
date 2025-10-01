import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { BookingModule } from '../booking/booking.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [BookingModule, UserModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
