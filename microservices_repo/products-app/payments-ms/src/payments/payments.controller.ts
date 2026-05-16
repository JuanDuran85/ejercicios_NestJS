import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
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
  public async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.stripeWebhook(req, res);
  }
}
