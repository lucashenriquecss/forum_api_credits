import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Query, SetMetadata } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { Roles } from 'src/users/entities/user-roles.enum';
import { Role } from 'src/utils/guard/roles.decorator';
import { PlanFeatures } from 'src/subscription-plan/entities/plan-enum';
import { FeatureGuard } from 'src/utils/guard/feature.plan';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) { }

  
  @UseGuards(JwtAuthGuard, RolesGuard,FeatureGuard)
  @Role(Roles.ADMIN, Roles.MODERATOR)
  // @SetMetadata('feature', PlanFeatures.ELITE) //exemplo de restrição para criação de topico apenas membro elite 
  @Post()
  async create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    try {
      return await this.subcategoryService.create(createSubcategoryDto);

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
      return await this.subcategoryService.findAll(params);

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
  async findOne(@Param('id') id: string, @Query() params) {
    try {
      return await this.subcategoryService.findOne(+id, params);

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
  async update(@Param('id') id: string, @Body() updateSubcategoryDto: UpdateSubcategoryDto) {
    try {
      return await this.subcategoryService.update(+id, updateSubcategoryDto);

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
      return await this.subcategoryService.remove(+id);

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
