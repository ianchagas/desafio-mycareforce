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
import { UpdateUsuarioUsecase } from '../usecase/update/update';
import { FindByEmailUsecase } from '../usecase/findByEmail/findByEmail';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly createUsuarioUsecase: CreateUsuarioUsecase,
    private readonly findOneUsuarioUsecase: FindOneUsuarioUsecase,
    private readonly findUsuariosUsecase: FindUsuariosUsecase,
    private readonly findByEmailUsecase: FindByEmailUsecase,
    private readonly deleteUsuarioUsecase: DeleteUsuarioUsecase,
    private readonly banUsuarioUsecase: BanUsuarioUsecase,
    private readonly updateUsuarioUsecase: UpdateUsuarioUsecase,
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

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string): Promise<UsuariosEntity> {
    return await this.findByEmailUsecase.execute(email);
  }

  @Put('/:uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe(uuidOptions)) uuid: string,
    @Body() payload: UpdateUsuarioDto,
  ): Promise<any> {
    return await this.updateUsuarioUsecase.execute({
      uuid,
      payload,
    });
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
