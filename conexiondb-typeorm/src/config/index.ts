import { registerAs } from '@nestjs/config';

export default registerAs('configFile', () => {
  return {
    database: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      db: process.env.DB_NAME,
    },
  };
});
