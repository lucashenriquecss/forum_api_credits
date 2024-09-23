import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, HttpException, HttpStatus, Query, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Role } from 'src/utils/guard/roles.decorator';
import { Roles } from 'src/users/entities/user-roles.enum';
import { LoggingInterceptor } from 'src/middlewares/logging/logging.interceptor';

@Controller('payment')
@UseInterceptors(LoggingInterceptor)

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.MODERATOR, Roles.USER)
  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {

      return await this.paymentService.create(createPaymentDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(Roles.ADMIN, Roles.MODERATOR, Roles.USER)
  @Get()
  async find(@Query() params) {
    try {

      return await this.paymentService.get(params);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Post('webhook')
  async mercadoPagoWebhook(@Req() req) {
    const { type, action, data } = req.body;

    if (type === 'payment' && action === 'payment.updated') {
      const paymentId = data.id;

      // Verificar status do pagamento via API do Mercado Pago
      // Atualizar status do usuário para "ativo" se pagamento foi aprovado
    }

    return { status: 'ok' };
  }


}
