import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { ApiKey } from '../../../../users/api-key/entities/api-key.entity';
import { REQUEST_USER_KEY } from '../../../iam.constants';
import { ActiveUserData } from '../../../interfaces';
import { ApiKeyService } from '../../api-key/api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger: Logger = new Logger(ApiKeyGuard.name);

  constructor(
    private readonly apiKeyService: ApiKeyService,
    @InjectRepository(ApiKey)
    private readonly apiKeysRepository: Repository<ApiKey>,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const apiKey: string | undefined = this.extractKeyFromHeader(request);
    if (!apiKey) {
      this.logger.error('API Key not found');
      throw new UnauthorizedException('API Key not found');
    }

    const apiKeyEntityId: string =
      this.apiKeyService.extractIdFromApiKey(apiKey);

    try {
      const apiKeyEntity: ApiKey | null = await this.apiKeysRepository.findOne({
        where: { uuid: apiKeyEntityId },
        relations: { user: true },
      });

      if (!apiKeyEntity) {
        this.logger.error('API Key not found');
        throw new UnauthorizedException('API Key not found');
      }

      await this.apiKeyService.validate(apiKey, apiKeyEntity.key);
      request[REQUEST_USER_KEY] = {
        sub: apiKeyEntity.user.id,
        email: apiKeyEntity.user.email,
        role: apiKeyEntity.user.role,
        permissions: apiKeyEntity.user.permissions,
      } as ActiveUserData;
    } catch (error) {
      const finalError = error as Error;
      this.logger.error(`Invalid API Key: ${finalError.message}`);
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }

  private extractKeyFromHeader(request: Request): string | undefined {
    const [type, apiKey] = request.headers.authorization?.split(' ') ?? [];
    return type === 'ApiKey' ? apiKey : undefined;
  }
}
