import { Module } from '@nestjs/common';
import { DadosService } from './dados.service';
import { DadosController } from './dados.controller';

@Module({
  controllers: [DadosController],
  providers: [DadosService],
  exports: [DadosService],
})
export class DadosModule {}
