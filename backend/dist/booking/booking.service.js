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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
let BookingService = class BookingService {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    async create(createBookingDto) {
        const appointmentDate = createBookingDto.appointmentDate instanceof Date
            ? createBookingDto.appointmentDate
            : new Date(createBookingDto.appointmentDate);
        const booking = this.bookingRepository.create({
            ...createBookingDto,
            appointmentDate,
            isConfirmed: createBookingDto.isConfirmed ?? false,
            status: createBookingDto.status ?? 'pending',
            depositAmount: createBookingDto.depositAmount ?? null,
            customerEmail: createBookingDto.customerEmail ?? null,
            customerPhone: createBookingDto.customerPhone ?? null,
        });
        return this.bookingRepository.save(booking);
    }
    async findOne(id) {
        const lookupId = Number(id);
        const booking = await this.bookingRepository.findOne({ where: { id: lookupId } });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with id ${id} not found`);
        }
        return booking;
    }
    async update(id, updateBookingDto) {
        const payload = {
            ...updateBookingDto,
        };
        if (updateBookingDto.appointmentDate) {
            payload.appointmentDate =
                updateBookingDto.appointmentDate instanceof Date
                    ? updateBookingDto.appointmentDate
                    : new Date(updateBookingDto.appointmentDate);
        }
        await this.bookingRepository.update(id, payload);
        return this.findOne(id);
    }
    async remove(id) {
        await this.bookingRepository.delete(id);
    }
    async findAll() {
        return this.bookingRepository.find();
    }
    async findBookingsByUserId(userId) {
        return this.bookingRepository.find({ where: { userId } });
    }
    async findUpcomingBookingsByUserId(userId) {
        return this.bookingRepository.find({
            where: {
                userId,
                appointmentDate: (0, typeorm_2.MoreThan)(new Date()),
            },
            order: { appointmentDate: 'ASC' },
        });
    }
    async getUpcomingBookings() {
        return this.bookingRepository.find({
            where: {
                appointmentDate: (0, typeorm_2.MoreThan)(new Date()),
            },
            order: { appointmentDate: 'ASC' },
        });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingService);
