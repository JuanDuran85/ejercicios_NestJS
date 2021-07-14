import { ConnectionOptions } from 'tls';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration } from '../config/config.keys';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export const dataBaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'postgres' as 'postgres',
        port: parseInt(config.get(Configuration.DATABASE_PORT)),
        host: config.get(Configuration.DB_HOST),
        username: config.get((Configuration.DB_USER)),
        password: config.get(Configuration.DB_PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
