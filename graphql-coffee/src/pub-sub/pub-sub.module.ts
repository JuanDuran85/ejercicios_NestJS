import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Module({
    providers: [PubSub],
    exports: [PubSub],
    imports: [],
    controllers: [],
})
export class PubSubModule {}
