import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription-plan.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plan.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Role } from 'src/utils/guard/roles.decorator';
import { Roles } from 'src/users/entities/user-roles.enum';

@Controller('subscription-plan')
export class SubscriptionPlanController {
  constructor(private readonly subscriptionPlanService: SubscriptionPlanService) {}
  
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN)
  @Post()
  async create(@Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto) {
    try {
      
      return await this.subscriptionPlanService.create(createSubscriptionPlanDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Role(Roles.ADMIN)
  @Get()
  async findAll() {
    try {
      return await this.subscriptionPlanService.findAll();
      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN)
  @Get(':id')
 async findOne(@Param('id') id: string) {
  try {
    
    return await this.subscriptionPlanService.findOne(+id);
  } catch (error) {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: error.stack,
    }, HttpStatus.FORBIDDEN, {
      cause: error
    });
  }
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubscriptionPlanDto: UpdateSubscriptionPlanDto) {
    try {
      return await this.subscriptionPlanService.update(+id, updateSubscriptionPlanDto);
      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Role(Roles.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      
      return await this.subscriptionPlanService.remove(+id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
}
