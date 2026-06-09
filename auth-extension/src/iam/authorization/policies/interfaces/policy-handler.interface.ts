import { ActiveUserData } from '../../../interfaces';
import { Policy } from './policy.interface';

export interface PolicyHandler<T extends Policy> {
  handle(policy: T, user: ActiveUserData): Promise<void>;
}
