export interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  DATABASE_URL: string;
}

export interface ConfigEnvs {
  port: number;
  natsServers: string[];
  databaseUrl: string;
}
