import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  public createPaymentSession() {
    return 'createPaymentSession';
  }

  @Get('success')
  public success() {
    return {
      ok: true,
      message: 'Payment successful',
    };
  }

  @Get('cancel')
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
