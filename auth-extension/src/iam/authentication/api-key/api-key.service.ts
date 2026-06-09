import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { HashingService } from '../../hashing';
import { GeneratedApiKeyPayload } from '../interfaces/generated-apikey-payload.interface';

@Injectable()
export class ApiKeyService {
  constructor(private readonly hashingService: HashingService) {}

  public async createAndHash(id: number): Promise<GeneratedApiKeyPayload> {
    const apiKey = this.generateApiKey(id);
    const hash = this.hashingService.hash(apiKey);
    return { apiKey, hash };
  }
  public async validate(apiKey: string, hashedKey: string): Promise<boolean> {
    return this.hashingService.compare(apiKey, hashedKey);
  }
  public extractIdFromApiKey(apiKey: string): string {
    const [id] = Buffer.from(apiKey, 'base64').toString().split(' ');
    return id;
  }
  private generateApiKey(id: number): string {
    const apiKey: string = `${id} ${randomUUID()}`;
    return Buffer.from(apiKey).toString('base64');
  }
}
