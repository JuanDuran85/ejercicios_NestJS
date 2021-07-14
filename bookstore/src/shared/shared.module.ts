import { MapperService } from './mapper.service';
import { Module } from '@nestjs/common';

@Module({
    controllers: [],
    providers: [MapperService],
    imports: [],
    exports: [MapperService]
})
export class SharedModule {}
