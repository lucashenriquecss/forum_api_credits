import { Roles } from "../entities/user-roles.enum";

export class CreateUserDto {
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly roles: Roles[];
    has_access?: boolean;
    credits?:number ;
    subscriptionPlanId?: number;
    subscription_plan_id?: number;
    subscription_expiration?
}
