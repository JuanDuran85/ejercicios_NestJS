import { Injectable } from '@nestjs/common';
import Stripe, { Checkout } from 'stripe';
import { ConfigEnvs, envs } from '../config';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { LineItems } from './interfaces';
@Injectable()
export class PaymentsService {
  private readonly envs: ConfigEnvs = envs;
  private readonly stripeClient = new Stripe(envs.stripeSecretKey);

  constructor() {}

  public async createPaymentSession(
    paymentSessionDto: PaymentSessionDto,
  ): Promise<Checkout.Session> {
    const { currency, items } = paymentSessionDto;

    const lineItems: LineItems[] = items.map(({ name, price, quantity }) => ({
      price_data: {
        currency,
        product_data: {
          name,
          images: ['https://i.imgur.com/EHyR2nP.png'],
        },
        unit_amount: Math.round(price * 100),
      },
      quantity,
    }));

    return await this.stripeClient.checkout.sessions.create({
      payment_intent_data: {
        metadata: {},
      },
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:3003/api/v1/payments/success',
      cancel_url: 'http://localhost:3003/api/v1/payments/cancelled',
    });
  }
}
