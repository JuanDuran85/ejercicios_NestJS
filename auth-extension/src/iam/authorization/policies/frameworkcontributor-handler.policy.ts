import { Injectable } from '@nestjs/common';
import { ActiveUserData } from '../../interfaces';
import { FrameworkContributorPolicy } from './framework-contributor.policy';
import { PolicyHandler } from './interfaces/policy-handler.interface';
import { PolicyHandlerStorage } from './policy-handlers.storage';

@Injectable()
export class FrameworkContributorPolicyHandler implements PolicyHandler<FrameworkContributorPolicy> {
  constructor(private readonly policyHandlerStorage: PolicyHandlerStorage) {
    this.policyHandlerStorage.add(FrameworkContributorPolicy, this);
  }

  public async handle(
    policy: FrameworkContributorPolicy,
    user: ActiveUserData,
  ): Promise<void> {
    const isContributor: boolean = user.email.endsWith('@urbe.edu.ve');
    if (!isContributor) {
      throw new Error(`User ${user.email} is not a framework contributor`);
    }
  }
}
