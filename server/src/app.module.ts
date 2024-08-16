import { LoginModule } from '@app/login';
import { RedisModule } from '@app/redis';
import { UsuariosModule } from '@app/usuarios';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsuariosModule, LoginModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
