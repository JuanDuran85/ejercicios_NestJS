import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';

export function EntityExistsPipe(entityCls: Type): Type<PipeTransform> {
  @Injectable()
  class EntityExistsPipe implements PipeTransform {
    constructor(
      @Inject(entityCls)
      private readonly entityRepository: {
        exists(condition: unknown): Promise<void>;
      },
    ) {}
    public async transform(
      value: any,
      metadata: ArgumentMetadata,
    ): Promise<unknown> {
      await this.entityRepository.exists({ where: { id: value } });
      return value;
    }
  }

  return EntityExistsPipe;
}
