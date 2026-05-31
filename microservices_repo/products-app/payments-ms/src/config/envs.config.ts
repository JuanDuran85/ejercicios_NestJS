import 'dotenv/config';
import * as joi from 'joi';
import { ConfigEnvs, EnvVars } from './interfaces.config';

export const envSchema: joi.ObjectSchema<EnvVars> = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    STRIPE_SECRET_KEY: joi.string().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs: ConfigEnvs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS.splice(0, 1),
  stripeSecretKey: envVars.STRIPE_SECRET_KEY,
  stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
  stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
  stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
};
