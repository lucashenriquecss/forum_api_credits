import { StatusPayment, TypePayment } from "../entities/status-payment-enum";

export class CreatePaymentDto {
    readonly value:number;
    readonly payment_date?:Date;
    readonly status?:StatusPayment[];
    url_payment?:string;
    readonly type:TypePayment[];
    readonly userId:number;
    readonly user_id?:number;
    payment_id?: string;
}
