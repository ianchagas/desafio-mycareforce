import { Controller, Get } from '@nestjs/common';
import { DadosService } from './dados.service';

@Controller('dados')
export class DadosController {
  constructor(private readonly dadosService: DadosService) {}

  @Get('profissional')
  async profissional(): Promise<any> {
    return await this.dadosService.profissional();
  }

  @Get('gestor')
  async gestor(): Promise<any> {
    return await this.dadosService.gestor();
  }
}
