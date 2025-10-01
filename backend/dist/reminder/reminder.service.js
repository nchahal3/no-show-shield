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
var ReminderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const booking_service_1 = require("../booking/booking.service");
const email_1 = require("../utils/email");
const twilio_1 = require("../utils/twilio");
let ReminderService = ReminderService_1 = class ReminderService {
    constructor(bookingService, emailService, twilioService) {
        this.bookingService = bookingService;
        this.emailService = emailService;
        this.twilioService = twilioService;
        this.logger = new common_1.Logger(ReminderService_1.name);
    }
    async handleDailyReminders() {
        const upcomingBookings = await this.bookingService.getUpcomingBookings();
        for (const booking of upcomingBookings) {
            await this.sendReminder(booking);
        }
    }
    async sendReminder(booking) {
        const message = `Reminder: You have an appointment scheduled for ${booking.appointmentDate.toISOString()}.`;
        if (booking.customerPhone) {
            await this.twilioService.sendSms(booking.customerPhone, message);
        }
        else {
            this.logger.debug(`Skipping SMS for booking ${booking.id}: no phone number.`);
        }
        if (booking.customerEmail) {
            await this.emailService.sendEmail(booking.customerEmail, 'Appointment Reminder', `<p>${message}</p>`);
        }
        else {
            this.logger.debug(`Skipping email for booking ${booking.id}: no email address.`);
        }
    }
};
exports.ReminderService = ReminderService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_9AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReminderService.prototype, "handleDailyReminders", null);
exports.ReminderService = ReminderService = ReminderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        email_1.EmailService,
        twilio_1.TwilioService])
], ReminderService);
