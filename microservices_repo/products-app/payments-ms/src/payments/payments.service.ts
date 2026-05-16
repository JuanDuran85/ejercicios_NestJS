import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
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
    const { orderId, currency, items } = paymentSessionDto;

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
        metadata: {
          orderId,
        },
      },
      mode: 'payment',
      line_items: lineItems,
      success_url: this.envs.stripeSuccessUrl,
      cancel_url: this.envs.stripeCancelUrl,
    });
  }

  public async stripeWebhook(req: Request, res: Response) {
    const signature: string | string[] | undefined =
      req.headers['stripe-signature'];
    const endpointSecret: string = this.envs.stripeEndpointSecret;
    let eventStripe: ReturnType<
      typeof this.stripeClient.webhooks.constructEvent
    >;
    try {
      eventStripe = this.stripeClient.webhooks.constructEvent(
        req['rawBody'],
        signature!,
        endpointSecret,
      );
    } catch (error) {
      res.status(400).send(`Webhook Error: ${JSON.stringify(error)}`);
      return;
    }

    if (eventStripe.type === 'charge.succeeded') {
      const chargeSucceeded = eventStripe.data.object;
      console.debug({ metadata: chargeSucceeded.metadata });
    } else {
      console.debug(
        `Event --> ${eventStripe.type}, out of range or not handled`,
      );
    }
    return res.status(200).json({ received: true, signature });
  }
}
