import { registerAs } from '@nestjs/config';

export default registerAs('configFile', () => {
  return {
    secretKey: process.env.SECRET_KEY,
  };
});
