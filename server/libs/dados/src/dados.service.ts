import { Injectable } from '@nestjs/common';

@Injectable()
export class DadosService {
  async profissional(): Promise<any> {
    return {
      data: [
        {
          id: 1,
          empresa: 'Hospital Santa Marcelina',
          vagas: [
            {
              id: 1,
              vaga: 'médico(a)',
              qtde: 2,
              valor_hora: 300,
            },
            {
              id: 2,
              vaga: 'enfermeiro(a)',
              qtde: 4,
              valor_hora: 100,
            },
          ],
          tipo_contratacao: 'temporaria',
        },
        {
          id: 2,
          empresa: 'Hospital Regional Rio do Sul',
          vagas: [
            {
              id: 1,
              vaga: 'médico(a)',
              qtde: 5,
              valor_hora: 300,
            },
            {
              id: 2,
              vaga: 'enfermeiro(a)',
              qtde: 3,
              valor_hora: 100,
            },
          ],
          tipo_contratacao: 'contratacao',
        },
      ],
    };
  }

  async gestor(): Promise<any> {
    return {
      data: [
        {
          id: 1,
          nome: 'João',
          profissao: 'enfermeiro',
          tempo_experiencia: '2 anos',
          valor_hora: 100,
        },
        {
          id: 2,
          nome: 'José',
          profissao: 'médico',
          tempo_experiencia: '4 anos',
          valor_hora: 300,
        },
        {
          id: 3,
          nome: 'Adriana',
          profissao: 'médica',
          tempo_experiencia: '5 anos',
          valor_hora: 350,
        },
        {
          id: 4,
          nome: 'Afonso',
          profissao: 'enfermeiro',
          tempo_experiencia: '10 anos',
          valor_hora: 250,
        },
      ],
    };
  }
}
