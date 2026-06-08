import { registerAs } from '@nestjs/config';
import { envs } from './envs.config';

const {
  jwtAccessTokenTtl,
  jwtSecret,
  jwtTokenAudience,
  jwtTokenIssuer,
  jwtRefreshTokenTtl,
} = envs;

export default registerAs('jwt', () => ({
  secret: jwtSecret,
  audience: jwtTokenAudience,
  issuer: jwtTokenIssuer,
  accessTokenTtl: Number.parseInt(jwtAccessTokenTtl ?? '3600', 10),
  refreshTokenTtl: Number.parseInt(jwtRefreshTokenTtl ?? '3600', 10),
}));
