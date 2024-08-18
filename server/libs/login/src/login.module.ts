import { Module } from '@nestjs/common';
import { LoginController } from './presentation/login.controller';
import { UsuariosModule } from '@app/usuarios';
import { LoginUsecase } from './usecase/login/login';
import { RedisModule } from '@app/redis';
import { RefreshUsecase } from './usecase/refresh/refresh';
import { LogoutUsecase } from './usecase/logout/logout';
@Module({
  imports: [RedisModule, UsuariosModule],
  providers: [LoginUsecase, RefreshUsecase, LogoutUsecase],
  exports: [],
  controllers: [LoginController],
})
export class LoginModule {}
