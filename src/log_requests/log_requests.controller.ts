import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogRequestsService } from './log_requests.service';
import { CreateLogRequestDto } from './dto/create-log_request.dto';
import { UpdateLogRequestDto } from './dto/update-log_request.dto';

@Controller('log-requests')
export class LogRequestsController {
  constructor(private readonly logRequestsService: LogRequestsService) {}


}
