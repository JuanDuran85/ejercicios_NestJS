export interface EnvVars {
  PORT: number;
  STRIPE_SECRET_KEY: string;
  STRIPE_ENDPOINT_SECRET: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
}

export interface ConfigEnvs {
  port: number;
  stripeSecretKey: string;
  stripeEndpointSecret: string;
  stripeSuccessUrl: string;
  stripeCancelUrl: string;
}
