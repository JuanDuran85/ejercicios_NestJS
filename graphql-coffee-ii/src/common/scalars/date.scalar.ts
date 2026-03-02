import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date')
export class DateScalar implements CustomScalar<number, Date> {
  public description: string = 'Date custom scalar type';

  public parseValue(value: Date): Date {
    return new Date(value);
  }

  public serialize(value: Date): number {
    console.debug(`Serializing: ${value}`);
    return value.getTime();
  }

  public parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) return new Date(ast.value);
    return new Date();
  }
}
