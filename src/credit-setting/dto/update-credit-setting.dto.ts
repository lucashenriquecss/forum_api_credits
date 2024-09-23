import { PartialType } from '@nestjs/swagger';
import { CreateCreditSettingDto } from './create-credit-setting.dto';

export class UpdateCreditSettingDto extends PartialType(CreateCreditSettingDto) {}
