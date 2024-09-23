import { Body, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentEntity } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { StatusPayment, TypePayment } from './entities/status-payment-enum';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  private mercadoPagoUrl = 'https://api.mercadopago.com/checkout/preferences?access_token=TOKEN_AQUI';
  private mercadoPagoToken = 'SEU_TOKEN_DO_MERCADO_PAGO'; 
  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,

  ) { }

  async create(createPaymentDto: CreatePaymentDto) {

    const user = await this.userRepository.findOne({
      where: {
        id: createPaymentDto.user_id,
        active: true
      }
    });

    if (!user) { throw new Error("Usuario nao encontrado ou esta suspenso") };

    const newPayment: CreatePaymentDto = {
      value: createPaymentDto.value,
      type: createPaymentDto.type,
      userId: createPaymentDto.user_id,
      payment_id:`${user.id}`
    }


    const payment = await this.paymentRepository.create({ ...newPayment, user })
    await this.paymentRepository.save(payment)
    return {id: payment.id, message:'criado'};
  }

  async get(params) {
    const query = this.paymentRepository.createQueryBuilder('payment')
      .leftJoinAndSelect('payment.user', 'user') 
      .select([
        'payment.id',
        'payment.status',
        'payment.type',
        'payment.url_payment',
        'payment.payment_id',
        'payment.payment_date',
        'payment.updated_at',
        'user.id', 
        'user.username', 
      ]);
  
    if (params.id) {
      query.andWhere('payment.id = :id', { id: params.id });
    }
  
    if (params.user_id) {
      query.andWhere('user.id = :user_id', { user_id: params.user_id });
    }
  
    return await query.getMany(); // Retorna múltiplos registros
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    await this.paymentRepository.update(id, updatePaymentDto)
  }

  async createPaymentLink(plan: any, user: any, type: string) {
    const paymentData = {
      items: [
        {
          title: plan.name,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(plan.monthly_cost),
        },
      ],
      payer: {
        email: user.email,
        name: user.username,
      },
      back_urls: {
        success: 'https://urlhost/pagamento/sucesso',
        failure: 'https://urlhost/pagamento/falha',
        pending: 'https://urlhost/pagamento/pendente',
      },
      notification_url: 'https://urlhost/api/pagamento/webhook',
    };

    // const response = await this.httpService.post(this.mercadoPagoUrl, paymentData, {
    //   // headers: {
    //   //   Authorization: `Bearer ${this.mercadoPagoToken}`,
    //   // },
    // }).toPromise();
    const response = await firstValueFrom(
      this.httpService.post(this.mercadoPagoUrl, paymentData)
    );


    const newPayment: CreatePaymentDto = {
      value: parseFloat(plan.monthly_cost),
      type: [TypePayment.MERCADOPAGO],
      userId: user.id,
      payment_id: response.data.id,
      url_payment: response.data.init_point
    }
    const payment = await this.paymentRepository.create({ ...newPayment, user })
    this.paymentRepository.save(payment);

    return response.data.init_point;
  }
}
