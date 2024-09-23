import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CreditSettingService } from './credit-setting.service';
import { CreateCreditSettingDto } from './dto/create-credit-setting.dto';
import { UpdateCreditSettingDto } from './dto/update-credit-setting.dto';
import { Roles } from 'src/users/entities/user-roles.enum';
import { Role } from 'src/utils/guard/roles.decorator';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';

@Controller('credit-setting')
export class CreditSettingController {
  constructor(private readonly creditSettingService: CreditSettingService) { }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Post()
  async create(@Body() createCreditSettingDto: CreateCreditSettingDto) {
    try {

      return await this.creditSettingService.create(createCreditSettingDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Role(Roles.ADMIN)
  // @Get()
  // async findAll() {
  //   return await this.creditSettingService.findAll();
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string, @Query() params) {
    try {

      return await this.creditSettingService.findOne(+id, params);
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
  @Role(Roles.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCreditSettingDto: UpdateCreditSettingDto) {
    try {
      return await this.creditSettingService.update(+id, updateCreditSettingDto);
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
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return await this.creditSettingService.remove(+id);
  // }
}
