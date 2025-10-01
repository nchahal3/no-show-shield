import { BookingStatus } from './create-booking.dto';

export class UpdateBookingDto {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  service?: string;
  appointmentDate?: Date | string;
  depositAmount?: number;
  status?: BookingStatus;
  isConfirmed?: boolean;
}
