import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { envs } from './config';

const { databaseUrl } = envs;
@Module({
  imports: [
    MongooseModule.forRoot(databaseUrl, {
      autoCreate: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [AuthModule],
})
export class AppModule {}
