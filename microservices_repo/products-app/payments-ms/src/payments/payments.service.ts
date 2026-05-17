import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import Stripe, { Checkout } from 'stripe';
import { ConfigEnvs, envs, NATS_SERVICE } from '../config';
import { PaymentSessionDto } from './dto/payment-session.dto';
import { LineItems } from './interfaces';

@Injectable()
export class PaymentsService {
  private readonly envs: ConfigEnvs = envs;
  private readonly stripeClient = new Stripe(envs.stripeSecretKey);
  private readonly logger: Logger = new Logger(PaymentsService.name);

  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) {}

  public async createPaymentSession(
    paymentSessionDto: PaymentSessionDto,
  ): Promise<Partial<Checkout.Session>> {
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

    const resultSession = await this.stripeClient.checkout.sessions.create({
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

    return {
      cancel_url: resultSession.cancel_url,
      success_url: resultSession.success_url,
      id: resultSession.id,
      url: resultSession.url,
    };
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
      const { id, metadata, receipt_url } = eventStripe.data.object;
      const payload = {
        stripePaymentId: id,
        orderId: metadata.orderId,
        receiptUrl: receipt_url,
      };
      this.natsClient.emit('payment.succeeded', payload);
    } else {
      this.logger.warn(
        `Event --> ${eventStripe.type}, out of range or not handled`,
      );
    }
    return res.status(200).json({ received: true, signature });
  }
}
