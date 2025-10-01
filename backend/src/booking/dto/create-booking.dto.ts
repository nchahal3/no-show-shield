export type BookingStatus = 'pending' | 'confirmed' | 'canceled' | 'no-show';

export class CreateBookingDto {
  userId!: number;
  customerName!: string;
  customerEmail?: string;
  customerPhone?: string;
  service!: string;
  appointmentDate!: Date | string;
  depositAmount?: number;
  status?: BookingStatus;
  isConfirmed?: boolean;
}
