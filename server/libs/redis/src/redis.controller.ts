import { Controller, Post } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post('')
  public async set(): Promise<void> {
    const key = 'nova-chave';
    const value = 'valor';
    const ttl = 1800;

    console.log('Chegou aqui');

    await this.redisService.set(key, value, ttl);
  }
}
