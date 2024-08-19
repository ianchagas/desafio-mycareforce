import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { GetUsuariosQueryParamsDto } from '@app/usuarios/dto/user.dto';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';
import { UserRole } from '@app/shared/enum/userRole.enum';
import { FindUsuariosUsecase } from './find';

describe('FindUsuariosUsecase', () => {
  let findUsuariosUsecase: FindUsuariosUsecase;
  let usuarioRepository: UsuarioRepository;

  beforeEach(async () => {
    const mockUsuarioRepository = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUsuariosUsecase,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
      ],
    }).compile();

    findUsuariosUsecase = module.get<FindUsuariosUsecase>(FindUsuariosUsecase);
    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('Should be defined', () => {
    expect(findUsuariosUsecase).toBeDefined();
  });

  describe('Execute Method', () => {
    it('Should return data and count when search term is provided', async () => {
      const payload: GetUsuariosQueryParamsDto = { searchTerm: 'searchTerm' };
      const mockData: UsuariosEntity[] = [
        {
          uuid: '1',
          nome: 'John',
          sobrenome: 'Doe',
          email: 'john@example.com',
          role: UserRole.GESTOR,
          password: 'password',
        } as UsuariosEntity,
      ];
      const mockCount = mockData.length;

      jest
        .spyOn(usuarioRepository, 'find')
        .mockResolvedValue({ data: mockData, count: mockCount });

      const result = await findUsuariosUsecase.execute(payload);

      expect(result).toEqual({ data: mockData, count: mockCount });
      expect(usuarioRepository.find).toHaveBeenCalledWith(payload.searchTerm);
    });

    it('Should return empty data and zero count when no users are found', async () => {
      const payload: GetUsuariosQueryParamsDto = { searchTerm: 'searchTerm' };
      const mockData: UsuariosEntity[] = [];
      const mockCount = mockData.length;

      jest
        .spyOn(usuarioRepository, 'find')
        .mockResolvedValue({ data: mockData, count: mockCount });

      const result = await findUsuariosUsecase.execute(payload);

      expect(result).toEqual({ data: mockData, count: mockCount });
      expect(usuarioRepository.find).toHaveBeenCalledWith(payload.searchTerm);
    });
  });
});
