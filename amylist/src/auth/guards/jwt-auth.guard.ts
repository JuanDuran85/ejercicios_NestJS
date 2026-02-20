import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  public getRequest(context: ExecutionContext) {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
