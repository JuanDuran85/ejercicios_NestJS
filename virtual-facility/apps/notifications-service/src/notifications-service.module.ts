import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationsServiceController } from './notifications-service.controller';
import { NotificationsServiceService } from './notifications-service.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [NotificationsServiceController],
  providers: [NotificationsServiceService],
})
export class NotificationsServiceModule {}
