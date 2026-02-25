import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';

@Module({
  providers: [ListsResolver, ListsService],
  // DIAGNOSTIC: Added TypeOrmModule.forFeature to properly register List repository
  imports: [TypeOrmModule.forFeature([List])],
  exports: [TypeOrmModule, ListsService],
})
export class ListsModule {}
