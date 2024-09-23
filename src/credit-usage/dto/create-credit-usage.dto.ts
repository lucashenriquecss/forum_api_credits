export class CreateCreditUsageDto {
    readonly action: string[];
    readonly credit_before: number;
    credit_now?: number;
    credit_used?: number;
    readonly userId: number;
}
