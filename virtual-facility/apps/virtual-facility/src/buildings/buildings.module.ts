import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WORKFLOWS_SERVICE } from '../constants';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';
import { Building } from './entities/building.entity';

@Module({
  controllers: [BuildingsController],
  providers: [BuildingsService],
  imports: [
    ClientsModule.register([
      {
        name: WORKFLOWS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
        },
      },
    ]),
    TypeOrmModule.forFeature([Building]),
  ],
})
export class BuildingsModule {}
