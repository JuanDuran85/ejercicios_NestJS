import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotifyFacilitySupervisorCommand } from './notify-facility-supervisor.command';

@CommandHandler(NotifyFacilitySupervisorCommand)
export class NotifyFacilitySupervisorCommandHandler implements ICommandHandler<NotifyFacilitySupervisorCommand> {
  private readonly logger: Logger = new Logger(
    NotifyFacilitySupervisorCommandHandler.name,
  );

  public async execute(
    command: NotifyFacilitySupervisorCommand,
  ): Promise<void> {
    this.logger.debug(
      `----------> Processing "NotifyFacilitySupervisorCommand": ${JSON.stringify(
        command,
      )}`,
    );
  }
}
