import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';
@Module({
  imports: [RedisModule],
  providers: [],
  exports: [],
})
export class SharedModule {}
