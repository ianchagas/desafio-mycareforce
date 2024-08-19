import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { BadRequestException } from '@nestjs/common';
import { DeleteUsuarioUsecase } from './delete';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';

describe('DeleteUsuarioUsecase', () => {
  let deleteUsuarioUsecase: DeleteUsuarioUsecase;
  let usuarioRepository: UsuarioRepository;

  beforeEach(async () => {
    const mockUsuarioRepository = {
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUsuarioUsecase,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
      ],
    }).compile();

    deleteUsuarioUsecase =
      module.get<DeleteUsuarioUsecase>(DeleteUsuarioUsecase);
    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('Should be defined', () => {
    expect(deleteUsuarioUsecase).toBeDefined();
  });

  describe('Execute Method', () => {
    it('Should throw an exception if user does not exist', async () => {
      const uuid = 'some-uuid';
      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(null);

      await expect(deleteUsuarioUsecase.execute(uuid)).rejects.toThrow(
        new BadRequestException('Usuário já encontra-se banido ou excluído.'),
      );
    });

    it('Should call delete method if user exists', async () => {
      const uuid = 'some-uuid';
      const user = new UsuariosEntity();
      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(usuarioRepository, 'delete').mockResolvedValue(undefined);

      await deleteUsuarioUsecase.execute(uuid);

      expect(usuarioRepository.findOne).toHaveBeenCalledWith(uuid);
      expect(usuarioRepository.delete).toHaveBeenCalledWith(user);
    });
  });
});
