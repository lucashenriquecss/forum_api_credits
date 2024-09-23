import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/users/entities/user-roles.enum';
import { Role } from 'src/utils/guard/roles.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.MODERATOR)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {

      return await this.categoryService.create(createCategoryDto);

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
  // @Role(Roles.ADMIN, Roles.MODERATOR)
  @Get()
  async findAll(@Query() params: string) {
    try {
      return await this.categoryService.findAll(params);
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
  async findOne(@Param('id') id: string,@Query() params) {
    try {

      return await this.categoryService.findOne(+id,params);
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
  @Role(Roles.ADMIN, Roles.MODERATOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {

      return await this.categoryService.update(+id, updateCategoryDto);
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
  @Role(Roles.ADMIN, Roles.MODERATOR)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {

      return await this.categoryService.remove(+id);

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
