import { RedisModule as NestRedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';
import { RedisController } from './redis.controller';

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
  controllers: [RedisController],
})
export class RedisModule {}
