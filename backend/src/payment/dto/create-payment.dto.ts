export class CreatePaymentDto {
  bookingId!: number;
  amount!: number;
  currency?: string;
  paymentMethodId?: string;
}
