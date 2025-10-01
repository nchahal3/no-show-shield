"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const booking_module_1 = require("./booking/booking.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const payment_module_1 = require("./payment/payment.module");
const reminder_module_1 = require("./reminder/reminder.module");
const subscription_module_1 = require("./subscription/subscription.module");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                autoLoadEntities: true,
                synchronize: true,
            }),
            booking_module_1.BookingModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            reminder_module_1.ReminderModule,
            dashboard_module_1.DashboardModule,
            payment_module_1.PaymentModule,
            subscription_module_1.SubscriptionModule,
        ],
    })
], AppModule);
