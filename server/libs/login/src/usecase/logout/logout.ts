import { RedisService } from '@app/redis/redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogoutUsecase {
  constructor(private readonly redis: RedisService) {}

  async execute(email: string) {
    await this.redis.del(email);
  }
}
