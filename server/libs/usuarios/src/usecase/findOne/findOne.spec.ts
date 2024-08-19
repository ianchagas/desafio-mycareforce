import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';
import { NotFoundException } from '@nestjs/common';
import { UserRole } from '@app/shared/enum/userRole.enum';
import { FindOneUsuarioUsecase } from './findOne';

describe('FindOneUsuarioUsecase', () => {
  let findOneUsuarioUsecase: FindOneUsuarioUsecase;
  let usuarioRepository: UsuarioRepository;

  beforeEach(async () => {
    const mockUsuarioRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneUsuarioUsecase,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
      ],
    }).compile();

    findOneUsuarioUsecase = module.get<FindOneUsuarioUsecase>(
      FindOneUsuarioUsecase,
    );
    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('Should be defined', () => {
    expect(findOneUsuarioUsecase).toBeDefined();
  });

  describe('Execute Method', () => {
    it('Should return a user if found', async () => {
      const uuid = 'any-uuid';
      const mockUser: UsuariosEntity = {
        uuid: uuid,
        nome: 'John',
        sobrenome: 'Doe',
        email: 'john.doe@example.com',
        role: UserRole.GESTOR,
        password: 'hashedpassword',
      } as UsuariosEntity;

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(mockUser);

      const result = await findOneUsuarioUsecase.execute(uuid);

      expect(result).toEqual(mockUser);
      expect(usuarioRepository.findOne).toHaveBeenCalledWith(uuid);
    });

    it('Should throw NotFoundException if user is not found', async () => {
      const uuid = 'nonexistent-uuid';

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(null);

      await expect(findOneUsuarioUsecase.execute(uuid)).rejects.toThrow(
        new NotFoundException('Usuário não encontrado'),
      );
    });
  });
});
