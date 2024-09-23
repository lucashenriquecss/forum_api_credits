import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketCommentsService } from './ticket-comments.service';
import { CreateTicketCommentDto } from './dto/create-ticket-comment.dto';
import { UpdateTicketCommentDto } from './dto/update-ticket-comment.dto';

@Controller('ticket-comments')
export class TicketCommentsController {
  constructor(private readonly ticketCommentsService: TicketCommentsService) {}

  @Post()
  create(@Body() createTicketCommentDto: CreateTicketCommentDto) {
    return this.ticketCommentsService.create(createTicketCommentDto);
  }

  @Get()
  findAll() {
    return this.ticketCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketCommentDto: UpdateTicketCommentDto) {
    return this.ticketCommentsService.update(+id, updateTicketCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketCommentsService.remove(+id);
  }
}
