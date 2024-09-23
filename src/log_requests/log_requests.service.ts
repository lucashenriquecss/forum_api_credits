import { Injectable } from '@nestjs/common';
import { CreateLogRequestDto } from './dto/create-log_request.dto';
import { UpdateLogRequestDto } from './dto/update-log_request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogRequestEntity } from './entities/log_request.entity';

@Injectable()
export class LogRequestsService {
  constructor(
    @InjectRepository(LogRequestEntity)
    private readonly logRepository: Repository<LogRequestEntity>,
  ) {}

  async createLog(logData: Partial<LogRequestEntity>): Promise<LogRequestEntity> {
    const log = this.logRepository.create(logData);
    return this.logRepository.save(log);
  }
}
