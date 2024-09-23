import { PartialType } from '@nestjs/swagger';
import { CreateLogRequestDto } from './create-log_request.dto';

export class UpdateLogRequestDto extends PartialType(CreateLogRequestDto) {}
