import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
    public readonly description: string = 'Date custom scalar type';

    public parseValue(value: number): Date {
        return new Date(value);
    };

    public serialize(value: Date): number {
        return value.getTime();
    };

    public parseLiteral(ast: ValueNode): Date {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }
        return null!;
    };

}
