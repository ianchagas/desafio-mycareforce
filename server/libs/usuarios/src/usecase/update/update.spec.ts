import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { UserRole } from '@app/shared/enum/userRole.enum';
import { ComparePassword } from '@app/shared/utils/comparePassword';
import { EncodePassword } from '@app/shared/utils/encodePassword';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateUsuarioUsecase } from './update';
import { UpdateUsuarioDto } from '@app/usuarios/dto/user.dto';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';

describe('UpdateUsuarioUsecase', () => {
  let updateUsuarioUsecase: UpdateUsuarioUsecase;
  let usuarioRepository: UsuarioRepository;

  const makeUserEntity = (
    uuid: string,
    password: string,
    email: string,
  ): UsuariosEntity => {
    return {
      id: 1,
      uuid,
      nome: 'Nome',
      sobrenome: 'Sobrenome',
      email: 'old-email@example.com',
      password: password,
      role: UserRole.GESTOR,
      isBanned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      updateTimestamp: null,
    };
  };

  beforeEach(async () => {
    const mockUsuarioRepository = {
      findOne: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUsuarioUsecase,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
      ],
    }).compile();

    updateUsuarioUsecase =
      module.get<UpdateUsuarioUsecase>(UpdateUsuarioUsecase);
    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('Should be defined', () => {
    expect(updateUsuarioUsecase).toBeDefined();
  });

  describe('Execute Method', () => {
    it('Should throw NotFoundException if user is not found', async () => {
      const uuid = 'nonexistent-uuid';
      const payload: UpdateUsuarioDto = {
        nome: '',
        sobrenome: '',
        email: '',
        role: UserRole.PROFISSIONAL,
        password: '',
      };

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(null);

      await expect(
        updateUsuarioUsecase.execute({ uuid, payload }),
      ).rejects.toThrow(new NotFoundException('Usuário não encontrado.'));
    });

    it('Should throw BadRequestException if new password is the same as the old one', async () => {
      const uuid = 'some-uuid';

      const payload: UpdateUsuarioDto = {
        password: 'samePassword',
        nome: 'Nome',
        sobrenome: 'Sobrenome',
        email: 'old-email@example.com',
        role: UserRole.GESTOR,
      };

      const usuario = makeUserEntity(uuid, '', '');

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(usuario);
      jest.spyOn(ComparePassword, 'execute').mockResolvedValue(true);

      await expect(
        updateUsuarioUsecase.execute({ uuid, payload }),
      ).rejects.toThrow(
        new BadRequestException('Senha não pode ser igual a anterior.'),
      );
    });

    it('Should throw BadRequestException if email is already registered', async () => {
      const uuid = 'some-uuid';
      const payload: UpdateUsuarioDto = {
        password: '',
        nome: 'Nome',
        sobrenome: 'Sobrenome',
        email: 'any_existing_email@example.com',
        role: UserRole.GESTOR,
      };

      const usuario = makeUserEntity(uuid, '', 'old_email@mail.com.br');

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(usuario);
      jest.spyOn(usuarioRepository, 'findByEmail').mockResolvedValue(usuario);

      await expect(
        updateUsuarioUsecase.execute({ uuid, payload }),
      ).rejects.toThrow(
        new BadRequestException(
          'Email já consta cadastrado. Não é possível alterar',
        ),
      );
    });

    it('Should throw BadRequestException if role is ADMIN', async () => {
      const uuid = 'some-uuid';
      const payload: UpdateUsuarioDto = {
        role: UserRole.ADMIN,
        nome: '',
        sobrenome: '',
        email: '',
        password: '',
      };

      const usuario = makeUserEntity(uuid, '', '');

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(usuario);

      await expect(
        updateUsuarioUsecase.execute({ uuid, payload }),
      ).rejects.toThrow(
        new BadRequestException(
          'Não é possível alterar uma conta para esse tipo de permissão.',
        ),
      );
    });

    it('Should update the user successfully', async () => {
      const uuid = 'some-uuid';
      const payload: UpdateUsuarioDto = {
        nome: 'Updated Name',
        sobrenome: 'Updated Surname',
        password: 'newPassword123',
        email: 'new-email@example.com',
        role: UserRole.GESTOR,
      };
      const usuario = makeUserEntity(uuid, '', '');

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(usuario);
      jest.spyOn(ComparePassword, 'execute').mockResolvedValue(false);
      jest
        .spyOn(EncodePassword, 'execute')
        .mockResolvedValue('newHashedPassword');
      jest.spyOn(usuarioRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(usuarioRepository, 'update').mockResolvedValue(undefined);

      await expect(
        updateUsuarioUsecase.execute({ uuid, payload }),
      ).resolves.not.toThrow();

      expect(usuarioRepository.update).toHaveBeenCalledWith(uuid, {
        ...payload,
        password: 'newHashedPassword',
      });
    });
  });
});
