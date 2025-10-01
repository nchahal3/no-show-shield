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
var DashboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("../booking/booking.service");
const user_service_1 = require("../user/user.service");
let DashboardService = DashboardService_1 = class DashboardService {
    constructor(bookingService, userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }
    async getUpcomingBookings(userId) {
        return this.bookingService.findUpcomingBookingsByUserId(userId);
    }
    async getAnalytics(userId) {
        const [user, bookings] = await Promise.all([
            this.userService.findById(userId),
            this.bookingService.findBookingsByUserId(userId),
        ]);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        const totalDeposits = bookings.reduce((acc, booking) => acc + (Number(booking.depositAmount) || 0), 0);
        const noShowCount = bookings.filter(booking => booking.status === 'no-show').length;
        const upcomingBookings = bookings.filter(booking => booking.appointmentDate > new Date());
        return {
            user,
            totalDeposits,
            noShowCount,
            totalBookings: bookings.length,
            upcomingBookingsCount: upcomingBookings.length,
            revenueSavedPercentage: this.calculateRevenueSavedPercentage(totalDeposits, bookings.length),
        };
    }
    calculateRevenueSavedPercentage(totalDeposits, totalBookings) {
        if (totalBookings === 0)
            return 0;
        return (totalDeposits / (totalBookings * DashboardService_1.AVERAGE_BOOKING_VALUE)) * 100;
    }
};
exports.DashboardService = DashboardService;
DashboardService.AVERAGE_BOOKING_VALUE = 100;
exports.DashboardService = DashboardService = DashboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        user_service_1.UserService])
], DashboardService);
