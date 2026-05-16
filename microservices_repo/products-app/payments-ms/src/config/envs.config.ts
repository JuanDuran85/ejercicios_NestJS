import 'dotenv/config';
import * as joi from 'joi';
import { ConfigEnvs, EnvVars } from './interfaces.config';

export const envSchema: joi.ObjectSchema<EnvVars> = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET_KEY: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs: ConfigEnvs = {
  port: envVars.PORT,
  stripeSecretKey: envVars.STRIPE_SECRET_KEY,
};
