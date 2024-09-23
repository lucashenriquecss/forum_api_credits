import { PartialType } from '@nestjs/swagger';
import { CreateCreditUsageDto } from './create-credit-usage.dto';

export class UpdateCreditUsageDto extends PartialType(CreateCreditUsageDto) {}
