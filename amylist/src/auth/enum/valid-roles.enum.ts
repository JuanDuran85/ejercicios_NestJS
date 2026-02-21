import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  user = 'user',
  superUser = 'superUser',
  developer = 'developer',
  seo = 'seo',
  seoAdmin = 'seoAdmin',
  seoSuperUser = 'seoSuperUser',
}

registerEnumType(ValidRoles, {
  name: 'ValidRoles',
  description: 'Valid roles for users',
});
