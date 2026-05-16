import { Body, Controller, Get, Post } from '@nestjs/common';
import { Checkout } from 'stripe';
import { PaymentSessionDto } from './dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  public async createPaymentSession(
    @Body() paymentSessionDto: PaymentSessionDto,
  ): Promise<Checkout.Session> {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  public success() {
    return {
      ok: true,
      message: 'Payment successful',
    };
  }

  @Get('cancelled')
  public cancel() {
    return {
      ok: false,
      message: 'Payment cancelled',
    };
  }

  @Post('webhook')
  public async stripeWebhook() {
    return 'stripe Webhook';
  }
}
