import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_URL!, {
    autoCreate: true,
  }),AuthModule],
  controllers: [],
  providers: [],
  exports: [AuthModule],
})
export class AppModule {}
