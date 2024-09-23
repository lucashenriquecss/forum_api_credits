import * as dotenv from 'dotenv';
dotenv.config();
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PaymentService } from '../payment.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities/payment.entity'; // Ou o nome da sua entidade para pagamentos
import { StatusPayment, TypePayment } from '../entities/status-payment-enum';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

@Injectable()
export class BitcoinPaymentsScheduler implements OnModuleInit {
    constructor(
        private readonly httpService: HttpService,
        private readonly paymentService: PaymentService,
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>,
    ) { }

    async onModuleInit() {
        // Executa uma verificação inicial ao iniciar o módulo
        await this.checkPendingPayments();
    }

    @Cron(CronExpression.EVERY_MINUTE) // Executa a cada  minutos
    async handleCron() {
        await this.checkPendingPayments();
    }

    private async checkPendingPayments() {
        const pendingPayments = await this.paymentRepository.find({ where: { status: StatusPayment.PENDING, payment_date: null } });
       
        for (const payment of pendingPayments) {

            if (payment.type.includes(TypePayment.MERCADOPAGO)) {

                const url = `https://api.mercadopago.com/v1/payments/${payment.payment_id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
                };

                const response = await firstValueFrom(
                    this.httpService.get(url, { headers })
                );
                if (response.data === 'ok') {//TODO: VERIFICAR STATUS DE CONFIRMADO DO MERCADO PAGO
                    await this.paymentService.update(payment.id, {
                        //status: StatusPayment.COMPLETED,
                        payment_date: response.data.date // verificar obj
                    })
                }
            }

        }
    }
}