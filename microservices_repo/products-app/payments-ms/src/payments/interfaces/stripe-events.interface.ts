export interface StripeEvents {
  type: string;
  data: Object;
  id: string;
  object: 'event';
  account?: string;
  api_version: string | null;
  context?: string;
  created: number;
  livemode: boolean;
  pending_webhooks: number;
  request: RequestStripeEvent | null;
}

interface RequestStripeEvent {
  id: string | null;
  idempotency_key: string | null;
}
