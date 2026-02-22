import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemsResolver } from './items.resolver';
import { ItemsService } from './items.service';

@Module({
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [],
})
export class ItemsModule {}
