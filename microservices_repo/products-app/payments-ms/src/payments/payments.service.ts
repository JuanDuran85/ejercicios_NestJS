import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigEnvs, envs } from '../config';

@Injectable()
export class PaymentsService {
  private readonly envs: ConfigEnvs = envs;
  private readonly stripe = new Stripe(envs.stripeSecretKey);
}
