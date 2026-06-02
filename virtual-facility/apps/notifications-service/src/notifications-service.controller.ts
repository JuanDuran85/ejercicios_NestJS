import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsServiceController {
  private readonly logger: Logger = new Logger(
    NotificationsServiceController.name,
  );

  @EventPattern('notification.send')
  public sendNotification(@Payload() data: unknown) {
    this.logger.debug(
      `Received new "notification.send" event with data: ${JSON.stringify(data)}`,
    );

    throw new Error('Failed to send notification');
  }
}
