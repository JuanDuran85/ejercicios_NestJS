export interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

export interface ConfigEnvs {
  port: number;
  natsServers: string[];
}
