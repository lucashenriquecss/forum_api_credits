import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CreditUsageService } from './credit-usage.service';
import { CreateCreditUsageDto } from './dto/create-credit-usage.dto';
import { UpdateCreditUsageDto } from './dto/update-credit-usage.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/users/entities/user-roles.enum';
import { Role } from 'src/utils/guard/roles.decorator';
@Controller('credit-usage')
export class CreditUsageController {
  constructor(private readonly creditUsageService: CreditUsageService) {}

  

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.USER, Roles.MODERATOR)
  @Get()
  async  findOne(@Query() params) {
    try {
      
      return await this.creditUsageService.findOne(params);
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
