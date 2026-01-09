export const AppEnvConfigurations = () => ({
  environment: process.env.NoDE_ENV || 'development',
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNC === 'true',
  },
  coffeesKey: {
    apiKey: process.env.API_KEY,
  },
});
