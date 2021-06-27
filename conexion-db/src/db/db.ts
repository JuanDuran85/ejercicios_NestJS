import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import configFile from '../config/index.config';

@Global()
@Module({
  providers: [
    {
      provide: 'DB',
      useFactory: (configService: ConfigType<typeof configFile>) => {
        const client = new Client({
          host: configService.database.host,
          database: configService.database.database,
          user: configService.database.user,
          password: configService.database.password,
        });
        client.connect();
        return client;
      },
      inject: [configFile.KEY],
    },
  ],
  exports: ['DB'],
})
export class DataBaseModule {}
