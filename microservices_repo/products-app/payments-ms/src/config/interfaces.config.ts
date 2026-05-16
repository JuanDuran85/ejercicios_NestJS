export interface EnvVars {
  PORT: number;
  STRIPE_SECRET_KEY: string;
  STRIPE_ENDPOINT_SECRET: string;
}

export interface ConfigEnvs {
    port: number;
    stripeSecretKey: string;
    stripeEndpointSecret: string;
}