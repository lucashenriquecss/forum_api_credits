import { IsInt, IsOptional } from "class-validator";
import { RolesSettings } from "src/credit-setting/entities/setting-role-enum";

export class CreateCommentDto {
    readonly content: string;
    readonly author_id?: number;
    readonly thread_id?: number;
    readonly threadId?: number;
    readonly authorId?: number;
    readonly action_types?: AllowedRolesSettings[];

    @IsOptional()
    @IsInt()
    parent_id?: number;
}
export type AllowedRolesSettings = RolesSettings.COMMENT | RolesSettings.IMAGE | RolesSettings.VIDEO;
