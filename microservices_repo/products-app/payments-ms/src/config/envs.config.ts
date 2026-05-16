import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
  PORT: number;
}

export const envSchema: joi.ObjectSchema<EnvVars> = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
};


