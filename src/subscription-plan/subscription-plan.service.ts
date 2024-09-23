import { Injectable } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionPlanEntity } from './entities/subscription-plan.entity';
import { Repository } from 'typeorm';
import { ErrorUtils } from 'src/utils/error-utils';

@Injectable()
export class SubscriptionPlanService {

  constructor(
    @InjectRepository(SubscriptionPlanEntity)
    private readonly subscriptionPlan: Repository<SubscriptionPlanEntity>,

  ) { }
  async create(createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    
    const newPlanDto: CreateSubscriptionPlanDto = {
      name: createSubscriptionPlanDto.name,
      credits: createSubscriptionPlanDto.credits,
      monthly_cost: createSubscriptionPlanDto.monthly_cost,
      description: createSubscriptionPlanDto.description,
      duration: createSubscriptionPlanDto.duration,
      features: createSubscriptionPlanDto.features
    }

    let resultCreateUser = this.subscriptionPlan.create(newPlanDto);
    return await this.subscriptionPlan.save(resultCreateUser);
  }

  async findAll() {
    return await this.subscriptionPlan.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} subscriptionPlan`;
  }

  async update(id: number, updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    return await this.subscriptionPlan.update(id, updateSubscriptionPlanDto)
  }

  async remove(id: number) {
    return await this.subscriptionPlan.delete(id)
  }
}
