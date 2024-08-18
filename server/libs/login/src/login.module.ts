import { Module } from '@nestjs/common';
import { LoginController } from './presentation/login.controller';
import { UsuariosModule } from '@app/usuarios';
import { LoginUsecase } from './usecase/login/login';
import { RedisModule } from '@app/redis';
import { RefreshUsecase } from './usecase/refresh/refresh';
@Module({
  imports: [RedisModule, UsuariosModule],
  providers: [LoginUsecase, RefreshUsecase],
  exports: [],
  controllers: [LoginController],
})
export class LoginModule {}
