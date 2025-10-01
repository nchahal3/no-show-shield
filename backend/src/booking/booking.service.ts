import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const appointmentDate =
      createBookingDto.appointmentDate instanceof Date
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

  async findOne(id: string | number): Promise<Booking> {
    const lookupId = Number(id);
    const booking = await this.bookingRepository.findOne({ where: { id: lookupId } });
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const payload: UpdateBookingDto = {
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

  async remove(id: number): Promise<void> {
    await this.bookingRepository.delete(id);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async findBookingsByUserId(userId: number): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { userId } });
  }

  async findUpcomingBookingsByUserId(userId: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        userId,
        appointmentDate: MoreThan(new Date()),
      },
      order: { appointmentDate: 'ASC' },
    });
  }

  async getUpcomingBookings(): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        appointmentDate: MoreThan(new Date()),
      },
      order: { appointmentDate: 'ASC' },
    });
  }
}
