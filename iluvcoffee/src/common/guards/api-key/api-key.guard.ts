import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic: boolean = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest<Request>();

    const authHeader: string | undefined = request.header('Authorization');
    return authHeader === this.configService.get<string>('coffeesKey.apiKey');
  }
}
