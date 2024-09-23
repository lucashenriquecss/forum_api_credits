import { Module } from '@nestjs/common';
import { TicketCommentsService } from './ticket-comments.service';
import { TicketCommentsController } from './ticket-comments.controller';

@Module({
  controllers: [TicketCommentsController],
  providers: [TicketCommentsService],
})
export class TicketCommentsModule {}
