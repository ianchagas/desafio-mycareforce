import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { LoginUsecase } from '../usecase/login/login';
import { JwtDto } from '@app/shared/dto/jwt.dto';
import { JwtValidate } from '@app/shared/utils/jwtValidate';
import { RefreshUsecase } from '../usecase/refresh/refresh';
import { LogoutUsecase } from '../usecase/logout/logout';

@Controller()
export class LoginController {
  constructor(
    private readonly loginUsecase: LoginUsecase,
    private readonly refreshTokenUsecase: RefreshUsecase,
    private readonly logoutUsecase: LogoutUsecase,
  ) {}

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<JwtDto> {
    return await this.loginUsecase.execute(payload);
  }

  @Post('login/refresh')
  async execute(@Body() payload: { refresh_token: string }): Promise<JwtDto> {
    return await this.refreshTokenUsecase.execute(payload);
  }

  @Post('logout')
  async logout(@Body() payload: { email: string }): Promise<void> {
    return await this.logoutUsecase.execute(payload.email);
  }
}
