import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!apiKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }

    this.stripe = new Stripe(apiKey, {
      apiVersion: '2020-08-27',
    });
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const amountInCents = Math.round(createPaymentDto.amount * 100);
    const currency = createPaymentDto.currency ?? 'usd';

    const metadata: Record<string, string> = {
      bookingId: String(createPaymentDto.bookingId),
    };

    if (createPaymentDto.paymentMethodId) {
      metadata.paymentMethodId = createPaymentDto.paymentMethodId;
    }

    return this.createPaymentIntent(amountInCents, currency, metadata);
  }

  async createPaymentIntent(amount: number, currency: string, metadata?: Record<string, string>) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
        metadata,
      });
      return paymentIntent;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Payment Intent creation failed: ${err.message}`);
    }
  }

  async confirmPaymentIntent(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Payment Intent confirmation failed: ${err.message}`);
    }
  }

  async retrievePaymentIntent(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Payment Intent retrieval failed: ${err.message}`);
    }
  }
}
