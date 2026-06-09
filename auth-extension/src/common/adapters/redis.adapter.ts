import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';
import { envs } from '../../config';

@Injectable()
export class RedisAdapter
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis = new Redis();

  public onApplicationBootstrap(): void {
    const { redisHost, redisPort } = envs;
    this.redisClient = new Redis({
      host: redisHost,
      port: Number(redisPort),
    });
  }

  public onApplicationShutdown(signal?: string): Promise<'OK'> {
    return this.redisClient.quit();
  }

  public async insert(data: number | string, token: string): Promise<void> {
    await this.redisClient.set(this.getKey(data), token);
  }

  public async validate(
    data: number | string,
    token: string,
  ): Promise<boolean> {
    const storedId: string | null = await this.redisClient.get(
      this.getKey(data),
    );
    return storedId === token;
  }

  public async invalidate(data: number | string): Promise<void> {
    await this.redisClient.del(this.getKey(data));
  }

  public getKey(data: number | string): string {
    return `user-${data}`;
  }
}
