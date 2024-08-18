import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestRedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        db: 1,
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
  controllers: [],
})
export class RedisModule {}
