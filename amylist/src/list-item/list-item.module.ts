import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListItem } from './entities/list-item.entity';
import { ListItemResolver } from './list-item.resolver';
import { ListItemService } from './list-item.service';

@Module({
  providers: [ListItemResolver, ListItemService],
  exports: [TypeOrmModule, ListItemService],
  imports: [TypeOrmModule.forFeature([ListItem])],
  controllers: [],
})
export class ListItemModule {}
