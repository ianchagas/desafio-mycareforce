import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto/user.dto';
import { CreateUsuarioUsecase } from '../usecase/create/create';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly createUsuarioUsecase: CreateUsuarioUsecase) {}

  @Post('')
  async create(@Body() payload: CreateUsuarioDto): Promise<any> {
    return null;
    // const createUsuario = await this.createUsuarioUsecase.execute(payload);

    // return createUsuario;
  }

  @Get('')
  async find(@Query() payload: any): Promise<any> {
    return null;
  }

  @Get('/:uuid')
  async findOne(@Param('uuid') uuid: string): Promise<any> {
    return null;
  }

  @Put('/:uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() payload: UpdateUsuarioDto,
  ): Promise<any> {
    return null;
  }

  @Delete('/:uuid')
  async delete(@Param('uuid') uuid: string): Promise<void> {
    return null;
  }

  @Put('/ban/:uuid')
  async ban(@Param('uuid') uuid: string): Promise<void> {
    return null;
  }
}
