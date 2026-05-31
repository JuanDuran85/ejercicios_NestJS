export interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  STRIPE_SECRET_KEY: string;
  STRIPE_ENDPOINT_SECRET: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
}

export interface ConfigEnvs {
  port: number;
  natsServers: string[];
  stripeSecretKey: string;
  stripeEndpointSecret: string;
  stripeSuccessUrl: string;
  stripeCancelUrl: string;
}
