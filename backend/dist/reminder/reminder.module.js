"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderModule = void 0;
const common_1 = require("@nestjs/common");
const booking_module_1 = require("../booking/booking.module");
const email_1 = require("../utils/email");
const twilio_1 = require("../utils/twilio");
const reminder_job_1 = require("./reminder.job");
const reminder_service_1 = require("./reminder.service");
let ReminderModule = class ReminderModule {
};
exports.ReminderModule = ReminderModule;
exports.ReminderModule = ReminderModule = __decorate([
    (0, common_1.Module)({
        imports: [booking_module_1.BookingModule],
        providers: [reminder_service_1.ReminderService, reminder_job_1.ReminderJob, email_1.EmailService, twilio_1.TwilioService],
        exports: [reminder_service_1.ReminderService],
    })
], ReminderModule);
