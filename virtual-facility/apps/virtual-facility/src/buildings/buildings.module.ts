import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';
import { Building } from './entities/building.entity';

@Module({
  controllers: [BuildingsController],
  providers: [BuildingsService],
  imports: [TypeOrmModule.forFeature([Building])],
})
export class BuildingsModule {}
