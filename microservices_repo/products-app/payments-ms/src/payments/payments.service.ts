import { Injectable } from '@nestjs/common';
import Stripe, { Checkout } from 'stripe';
import { ConfigEnvs, envs } from '../config';
@Injectable()
export class PaymentsService {
  private readonly envs: ConfigEnvs = envs;
  private readonly stripeClient = new Stripe(envs.stripeSecretKey);

  constructor() {}

  public async createPaymentSession(): Promise<Checkout.Session> {
    return await this.stripeClient.checkout.sessions.create({
      payment_intent_data: {
        metadata: {},
      },
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 2000,
          },
          quantity: 2,
        },
      ],
      success_url: 'http://localhost:3003/api/v1/payments/success',
      cancel_url: 'http://localhost:3003/api/v1/payments/cancelled',
    });
  }
}
