import { PartialType } from '@nestjs/swagger';
import { CreateTicketCommentDto } from './create-ticket-comment.dto';

export class UpdateTicketCommentDto extends PartialType(CreateTicketCommentDto) {}
