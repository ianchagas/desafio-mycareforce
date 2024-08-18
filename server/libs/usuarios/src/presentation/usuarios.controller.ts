import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateUsuarioDto,
  GetUsuariosQueryParamsDto,
  UpdateUsuarioDto,
} from '../dto/user.dto';
import { CreateUsuarioUsecase } from '../usecase/create/create';
import { FindOneUsuarioUsecase } from '../usecase/findOne/findOne';
import { UsuariosEntity } from '../infra/typeorm/entity/usuarios.entity';
import { uuidOptions } from '@app/shared/pipes/uuid.config';
import { FindUsuariosUsecase } from '../usecase/find/find';
import { DeleteUsuarioUsecase } from '../usecase/delete/delete';
import { BanUsuarioUsecase } from '../usecase/ban/ban';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly createUsuarioUsecase: CreateUsuarioUsecase,
    private readonly findOneUsuarioUsecase: FindOneUsuarioUsecase,
    private readonly findUsuariosUsecase: FindUsuariosUsecase,
    private readonly deleteUsuarioUsecase: DeleteUsuarioUsecase,
    private readonly banUsuarioUsecase: BanUsuarioUsecase,
  ) {}

  @Post('')
  async create(@Body() payload: CreateUsuarioDto): Promise<UsuariosEntity> {
    const createUsuario = await this.createUsuarioUsecase.execute(payload);

    return createUsuario;
  }

  @Get('')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async find(
    @Query() payload: GetUsuariosQueryParamsDto,
  ): Promise<{ data: UsuariosEntity[]; count: number }> {
    return await this.findUsuariosUsecase.execute(payload);
  }

  @Get('/:uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<UsuariosEntity> {
    return await this.findOneUsuarioUsecase.execute(uuid);
  }

  @Put('/:uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() payload: UpdateUsuarioDto,
  ): Promise<any> {
    return null;
  }

  @Delete('/:uuid')
  async delete(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return await this.deleteUsuarioUsecase.execute(uuid);
  }

  @Put('/ban/:uuid')
  async ban(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
  ): Promise<void> {
    return await this.banUsuarioUsecase.execute(uuid);
  }
}
