import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  public abstract hash(data: string): string;
  public abstract compare(data: string, encrypted: string): boolean;
}
