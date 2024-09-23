import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, HttpException, HttpStatus, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Role } from 'src/utils/guard/roles.decorator';
import { Roles } from './entities/user-roles.enum';
import { FeatureGuard } from 'src/utils/guard/feature.plan';
import { PlanFeatures } from 'src/subscription-plan/entities/plan-enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {

      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN,Roles.USER)
  // @SetMetadata('feature', PlanFeatures.ELITE)
  @Get()
  async findAll(@Query() params) {
    try {
      return await this.usersService.findAll(params);
      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.USER, Roles.MODERATOR)
  @Get(':id')
  async findOne(@Param('id') id: string, @Query() params) {
    try {
      return await this.usersService.findOne(+id, params);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_ACCEPTABLE,
        error: error.stack,
      }, HttpStatus.NOT_ACCEPTABLE, {
        cause: error
      });
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.USER, Roles.MODERATOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(+id, updateUserDto);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.MODERATOR) // implements delçete account creator opt ional
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {

      return await this.usersService.remove(+id);
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
