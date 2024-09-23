import { RolesSettings } from 'src/credit-setting/entities/setting-role-enum';

export class CreateThreadDto {
    readonly title: string;
    readonly content: string;
    readonly authorId?: number;
    readonly author_id?: number;
    subcategory_id?: number;
    subcategoryId?: number;
    categoryId?: number;
    category_id?: number;
    readonly action_types?: AllowedRolesSettings[];

}
export type AllowedRolesSettings = RolesSettings.THREAD | RolesSettings.IMAGE | RolesSettings.VIDEO;
