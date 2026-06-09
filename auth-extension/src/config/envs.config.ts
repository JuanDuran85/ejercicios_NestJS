import 'dotenv/config';
import * as joi from 'joi';
import { ConfigEnvs, EnvVars } from './interfaces.config';

export const envSchema: joi.ObjectSchema<EnvVars> = joi
  .object({
    PORT: joi.number().required(),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_HOST: joi.string().required(),
    POSTGRES_PORT: joi.string().required(),
    POSTGRES_DB: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_TOKEN_AUDIENCE: joi.string().required(),
    JWT_TOKEN_ISSUER: joi.string().required(),
    JWT_ACCESS_TOKEN_TTL: joi.string().required(),
    JWT_REFRESH_TOKEN_TTL: joi.string().required(),
    REDIS_HOST: joi.string().required(),
    REDIS_PORT: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envVars: EnvVars = value;

export const envs: ConfigEnvs = {
  port: envVars.PORT,
  postgresUser: envVars.POSTGRES_USER,
  postgresPassword: envVars.POSTGRES_PASSWORD,
  postgresHost: envVars.POSTGRES_HOST,
  postgresPort: envVars.POSTGRES_PORT,
  postgresDb: envVars.POSTGRES_DB,
  jwtSecret: envVars.JWT_SECRET,
  jwtTokenAudience: envVars.JWT_TOKEN_AUDIENCE,
  jwtTokenIssuer: envVars.JWT_TOKEN_ISSUER,
  jwtAccessTokenTtl: envVars.JWT_ACCESS_TOKEN_TTL,
  jwtRefreshTokenTtl: envVars.JWT_REFRESH_TOKEN_TTL,
  redisHost: envVars.REDIS_HOST,
  redisPort: envVars.REDIS_PORT,
};
