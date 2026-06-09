import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/auth-type.enum';

export const AUTH_TYPE_KEY = 'authType';

export const Auth: (...authTypes: AuthType[]) => CustomDecorator<string> = (
  ...authTypes: AuthType[]
): CustomDecorator<string> => SetMetadata(AUTH_TYPE_KEY, authTypes);
