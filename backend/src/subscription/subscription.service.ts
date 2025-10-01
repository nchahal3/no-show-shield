import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      status: 'active',
    });
    return this.subscriptionRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find();
  }

  async findOne(id: string | number): Promise<Subscription> {
    const lookupId = Number(id);
    const subscription = await this.subscriptionRepository.findOne({ where: { id: lookupId } });

    if (!subscription) {
      throw new NotFoundException(`Subscription with id ${id} not found`);
    }

    return subscription;
  }

  async cancel(id: number): Promise<Subscription> {
    await this.subscriptionRepository.update(id, { status: 'canceled' });
    return this.findOne(id);
  }
}
