import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Role } from 'src/utils/guard/roles.decorator';
import { Roles } from 'src/users/entities/user-roles.enum';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN)
  @Post()
  async create(@Body() createBannerDto: CreateBannerDto) {
    try {
      return await this.bannersService.create(createBannerDto);
      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.bannersService.findAll();
      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      
      return await this.bannersService.findOne(+id);
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
  async update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    try {
      return await this.bannersService.update(+id, updateBannerDto);
      
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
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.bannersService.remove(+id);
      
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
