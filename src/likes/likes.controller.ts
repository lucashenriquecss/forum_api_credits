import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Role } from 'src/utils/guard/roles.decorator';
import { Roles } from 'src/users/entities/user-roles.enum';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Get('trendings')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Role(Roles.ADMIN, Roles.USER, Roles.MODERATOR)
  async trendings(@Req() req) {
    try {
      return await this.likesService.trendings();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Post('thread/:thread_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.USER, Roles.MODERATOR)
  async likePost(@Req() req, @Param('thread_id') thread_id: number) {
    try {
      
      return await this.likesService.likePost(req.user.id, thread_id);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Delete('thread/:thread_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.USER, Roles.MODERATOR)
  async unlikePost(@Req() req, @Param('thread_id') thread_id: number) {
    try {
      return await this.likesService.unlikePost(req.user.id, thread_id);
      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Post('comment/:comment_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.USER, Roles.MODERATOR)
  async likeComment(@Req() req, @Param('comment_id') comment_id: number) {
    try {
      return await this.likesService.likeComment(req.user.id, comment_id);
      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Delete('comment/:comment_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.USER, Roles.MODERATOR)
  async unlikeComment(@Req() req, @Param('comment_id') comment_id: number) {
    try {
      
      return await this.likesService.unlikeComment(req.user.id, comment_id);
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
