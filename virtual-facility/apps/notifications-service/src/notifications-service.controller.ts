import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class NotificationsServiceController {
  private readonly logger: Logger = new Logger(
    NotificationsServiceController.name,
  );

  @EventPattern('notification.send')
  public sendNotification(
    @Payload() data: unknown,
    @Ctx() context: RmqContext,
  ) {
    this.logger.debug(
      `Received new "notification.send" event with data: ${JSON.stringify(data)}`,
    );

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (originalMsg.fields.redelivered) {
      this.logger.verbose(`Message was already redelivered, skipping...`);
      return channel.ack(originalMsg);
    }

    channel.ack(originalMsg);
  }
}
