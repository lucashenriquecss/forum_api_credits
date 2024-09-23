import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { Roles } from 'src/users/entities/user-roles.enum';
import { Role } from 'src/utils/guard/roles.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.MODERATOR,Roles.USER)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      return await this.commentService.create(createCommentDto);
      
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
      return await this.commentService.findAll(params);
      
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
  @Role(Roles.ADMIN, Roles.MODERATOR,Roles.USER)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    try {
      
      return await this.commentService.update(+id, updateCommentDto);
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
  @Role(Roles.ADMIN, Roles.MODERATOR,Roles.USER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.commentService.remove(+id);
      
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
