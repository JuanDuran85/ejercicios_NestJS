export interface EnvVars {
  PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_DB: string;
  JWT_SECRET: string;
  JWT_TOKEN_AUDIENCE: string;
  JWT_TOKEN_ISSUER: string;
  JWT_ACCESS_TOKEN_TTL: string;
  JWT_REFRESH_TOKEN_TTL: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  TFA_APP_NAME: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

export interface ConfigEnvs {
  port: number;
  postgresUser: string;
  postgresPassword: string;
  postgresHost: string;
  postgresPort: string;
  postgresDb: string;
  jwtSecret: string;
  jwtTokenAudience: string;
  jwtTokenIssuer: string;
  jwtAccessTokenTtl: string;
  jwtRefreshTokenTtl: string;
  redisHost: string;
  redisPort: string;
  tfaAppName: string;
  googleClientId: string;
  googleClientSecret: string;
}
