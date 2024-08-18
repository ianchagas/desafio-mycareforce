import { Redis } from 'ioredis';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redisService: Redis) {}

  async set(key: string, value: any, ttl?: number): Promise<void> {
    if (ttl && ttl > 0) {
      await this.redisService.set(key, value, 'EX', ttl);
    } else {
      await this.redisService.set(key, value);
    }
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

  async updateBannedStatus(
    key: string,
    newIsBannedValue: boolean,
  ): Promise<void> {
    const currentValue: string = await this.redisService.get(key);
    const ttl: number = await this.redisService.ttl(key);

    if (!currentValue) {
      return;
    }

    const jsonValue = JSON.parse(currentValue);

    jsonValue.userData.isBanned = newIsBannedValue;

    const updatedValue = JSON.stringify(jsonValue);

    await this.redisService.set(key, updatedValue, 'EX', ttl);
  }
}
