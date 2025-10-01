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
exports.ReminderJob = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const reminder_service_1 = require("./reminder.service");
const booking_service_1 = require("../booking/booking.service");
let ReminderJob = class ReminderJob {
    constructor(reminderService, bookingService) {
        this.reminderService = reminderService;
        this.bookingService = bookingService;
    }
    async handleReminderJob() {
        const upcomingBookings = await this.bookingService.getUpcomingBookings();
        for (const booking of upcomingBookings) {
            await this.reminderService.sendReminder(booking);
        }
    }
};
exports.ReminderJob = ReminderJob;
__decorate([
    (0, schedule_1.Cron)('0 8 * * *') // Runs every day at 8 AM
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReminderJob.prototype, "handleReminderJob", null);
exports.ReminderJob = ReminderJob = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reminder_service_1.ReminderService,
        booking_service_1.BookingService])
], ReminderJob);
