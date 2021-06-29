import { registerAs } from '@nestjs/config';

export default registerAs('confiFile', () => {
  return {
    database: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
    },
  };
});
