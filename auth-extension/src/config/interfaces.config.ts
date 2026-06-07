export interface EnvVars {
  PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  POSTGRES_DB: string;
}

export interface ConfigEnvs {
  port: number;
  postgresUser: string;
  postgresPassword: string;
  postgresHost: string;
  postgresPort: string;
  postgresDb: string;
}
