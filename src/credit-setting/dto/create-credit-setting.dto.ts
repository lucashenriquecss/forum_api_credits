import { RolesSettings } from "../entities/setting-role-enum";

export class CreateCreditSettingDto {
    readonly credits_required: number;
    readonly action_type: RolesSettings[];
}
