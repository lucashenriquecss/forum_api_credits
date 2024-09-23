import { PlanFeatures } from "../entities/plan-enum";

export class CreateSubscriptionPlanDto {

    readonly name: string;
    readonly monthly_cost: number;
    readonly credits: number;
    readonly description: string[];
    readonly duration:number;
    readonly features: PlanFeatures[]

}
