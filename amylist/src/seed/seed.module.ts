import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from '../items/items.module';
import { ListItemModule } from '../list-item/list-item.module';
import { ListsModule } from '../lists';
import { UsersModule } from '../users/users.module';
import { SeedResolver } from './seed.resolver';
import { SeedService } from './seed.service';

@Module({
  providers: [SeedResolver, SeedService],
  exports: [SeedService],
  controllers: [],
  imports: [
    ConfigModule,
    ItemsModule,
    ListItemModule,
    ListsModule,
    UsersModule,
  ],
})
export class SeedModule {}
