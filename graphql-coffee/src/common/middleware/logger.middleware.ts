import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";


export const loggerMiddleware: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
    const value: string = await next();
    console.debug("----------------------------");
    console.debug(value);
    console.debug("----------------------------");
    return value.toUpperCase();
}