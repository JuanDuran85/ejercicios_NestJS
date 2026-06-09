import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { PermissionType } from '../permission.type';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions: (
  ...permissions: PermissionType[]
) => CustomDecorator<string> = (...permissions: PermissionType[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
