import { Module } from '@nestjs/common';
import { CacheMiddleware } from './cache.middleware';

@Module({
    imports: [],
    providers: [CacheMiddleware],
    exports: [CacheMiddleware], // Export if needed
})
export class CacheModule { }
