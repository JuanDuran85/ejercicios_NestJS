/* eslint-disable prettier/prettier */

import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Event } from "src/events/entities/event.entity";
import { Attendee } from './../events/entities/attendee.entity';

export default registerAs('orm.config',
    (): TypeOrmModuleOptions => (
    {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Event, Attendee],
        synchronize: true,
        autoLoadEntities: true,
    }
));