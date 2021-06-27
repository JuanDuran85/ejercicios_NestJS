import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import configFile from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof configFile>) => {
        const { password, user, host, db } = configService.database;
        return {
          type: 'postgres',
          host,
          password,
          database: db,
          username: user,
          port: 5432,
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [configFile.KEY],
    }),
  ],
})
export class DataBaseModule {}
