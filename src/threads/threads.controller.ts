import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/users/entities/user-roles.enum';
import { Role } from 'src/utils/guard/roles.decorator';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.MODERATOR,Roles.USER)
  @Post()
  async create(@Body() createThreadDto: CreateThreadDto) {
    try {
      return await this.threadsService.create(createThreadDto);
      
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
  async findAll(@Query() params) {
    try {
      return await this.threadsService.findAll(params);
      
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
  @Role(Roles.ADMIN, Roles.MODERATOR, Roles.USER)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto) {
    try {
      
      return await this.threadsService.update(+id, updateThreadDto);
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
  @Role(Roles.ADMIN, Roles.MODERATOR, Roles.USER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.threadsService.remove(+id);
      
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
