import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PlanFeatures } from '../../subscription-plan/entities/plan-enum'; 
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeature = this.reflector.get<PlanFeatures>('feature', context.getHandler());

    if (!requiredFeature) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id; 

    if (!userId) {
      throw new ForbiddenException('User not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['subscription_plan'],
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const plan = user.subscription_plan;

    if (!plan.features.includes(requiredFeature)) {
      throw new ForbiddenException('Feature not available on your subscription plan');
    }

    return true;
  }
}
