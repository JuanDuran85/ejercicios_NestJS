import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { InMemoryAlarmPersistenceModule } from './persistence/in-memory/in-memory-persistence.module';
import { OrmAlarmPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({
  imports: [SharedModule],
  exports: [SharedModule],
})
export class AlarmsInfrastructureModule {
  public static use(driver: 'orm' | 'in-memory') {
    const persistenceModule: typeof OrmAlarmPersistenceModule =
      driver === 'orm'
        ? OrmAlarmPersistenceModule
        : InMemoryAlarmPersistenceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
