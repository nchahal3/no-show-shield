"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
let PaymentService = class PaymentService {
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('STRIPE_SECRET_KEY');
        if (!apiKey) {
            throw new Error('STRIPE_SECRET_KEY is not configured');
        }
        this.stripe = new stripe_1.Stripe(apiKey, {
            apiVersion: '2020-08-27',
        });
    }
    async createPayment(createPaymentDto) {
        const amountInCents = Math.round(createPaymentDto.amount * 100);
        const currency = createPaymentDto.currency ?? 'usd';
        const metadata = {
            bookingId: String(createPaymentDto.bookingId),
        };
        if (createPaymentDto.paymentMethodId) {
            metadata.paymentMethodId = createPaymentDto.paymentMethodId;
        }
        return this.createPaymentIntent(amountInCents, currency, metadata);
    }
    async createPaymentIntent(amount, currency, metadata) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount,
                currency,
                payment_method_types: ['card'],
                metadata,
            });
            return paymentIntent;
        }
        catch (error) {
            const err = error;
            throw new Error(`Payment Intent creation failed: ${err.message}`);
        }
    }
    async confirmPaymentIntent(paymentIntentId) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);
            return paymentIntent;
        }
        catch (error) {
            const err = error;
            throw new Error(`Payment Intent confirmation failed: ${err.message}`);
        }
    }
    async retrievePaymentIntent(paymentIntentId) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
            return paymentIntent;
        }
        catch (error) {
            const err = error;
            throw new Error(`Payment Intent retrieval failed: ${err.message}`);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentService);
