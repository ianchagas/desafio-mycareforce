import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';
import { UserRole } from '@app/shared/enum/userRole.enum';
import { FindByEmailUsecase } from './findByEmail';

describe('FindByEmailUsecase', () => {
  let findByEmailUsecase: FindByEmailUsecase;
  let usuarioRepository: UsuarioRepository;

  beforeEach(async () => {
    const mockUsuarioRepository = {
      findByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByEmailUsecase,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
      ],
    }).compile();

    findByEmailUsecase = module.get<FindByEmailUsecase>(FindByEmailUsecase);
    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('Should be defined', () => {
    expect(findByEmailUsecase).toBeDefined();
  });

  describe('Execute Method', () => {
    it('Should return a user if email exists', async () => {
      const email = 'test@example.com';
      const mockUser: UsuariosEntity = {
        uuid: '1',
        nome: 'John',
        sobrenome: 'Doe',
        email: email,
        role: UserRole.GESTOR,
        password: 'password',
      } as UsuariosEntity;

      jest.spyOn(usuarioRepository, 'findByEmail').mockResolvedValue(mockUser);

      const result = await findByEmailUsecase.execute(email);

      expect(result).toEqual(mockUser);
      expect(usuarioRepository.findByEmail).toHaveBeenCalledWith(email);
    });

    it('Should return null if email does not exist', async () => {
      const email = 'nonexistent@example.com';

      jest.spyOn(usuarioRepository, 'findByEmail').mockResolvedValue(null);

      const result = await findByEmailUsecase.execute(email);

      expect(result).toBeNull();
      expect(usuarioRepository.findByEmail).toHaveBeenCalledWith(email);
    });
  });
});
