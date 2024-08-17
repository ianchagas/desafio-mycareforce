import { Redis } from 'ioredis';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redisService: Redis) {}

  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (!ttl) {
      await this.redisService.set(key, value, 'EX', 0);
    }

    await this.redisService.set(key, value, 'EX', ttl);
  }

  async get<Type>(key: string): Promise<Type | null> {
    const data = await this.redisService.get(key);

    if (!data) {
      return null;
    }
    return data as Type;
  }

  async del(key: string): Promise<void> {
    await this.redisService.del(key);
  }
}
