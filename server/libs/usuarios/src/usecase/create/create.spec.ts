import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from '@app/usuarios/dto/user.dto';
import { UserRole } from '@app/shared/enum/userRole.enum';
import { EncodePassword } from '@app/shared/utils/encodePassword';
import { CreateUsuarioUsecase } from './create';

jest.mock('@app/shared/utils/encodePassword', () => ({
  EncodePassword: {
    execute: jest.fn(),
  },
}));

describe('CreateUsuarioUsecase', () => {
  let createUsuarioUsecase: CreateUsuarioUsecase;
  let usuarioRepository: UsuarioRepository;

  beforeEach(async () => {
    const mockUsuarioRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUsuarioUsecase,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
      ],
    }).compile();

    createUsuarioUsecase =
      module.get<CreateUsuarioUsecase>(CreateUsuarioUsecase);
    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('Should be defined', () => {
    expect(createUsuarioUsecase).toBeDefined();
  });

  describe('Execute Method', () => {
    it('Should throw an exception if email is already registered', async () => {
      const payload: CreateUsuarioDto = {
        nome: 'John',
        sobrenome: 'Doe',
        email: 'test@example.com',
        role: UserRole.GESTOR,
        password: 'password123',
      };

      jest
        .spyOn(usuarioRepository, 'findByEmail')
        .mockResolvedValue(payload as any);

      await expect(createUsuarioUsecase.execute(payload)).rejects.toThrow(
        new BadRequestException('Email já consta cadastrado.'),
      );
    });

    it('Should throw an exception if role is ADMIN', async () => {
      const payload: CreateUsuarioDto = {
        nome: 'John',
        sobrenome: 'Doe',
        email: 'test@example.com',
        role: UserRole.ADMIN,
        password: 'password123',
      };

      jest.spyOn(usuarioRepository, 'findByEmail').mockResolvedValue(null);

      await expect(createUsuarioUsecase.execute(payload)).rejects.toThrow(
        new BadRequestException(
          'Não é possível criar uma conta com esse tipo de permissão.',
        ),
      );
    });

    it('Should create a new user if email is not registered and role is not ADMIN', async () => {
      const payload: CreateUsuarioDto = {
        nome: 'John',
        sobrenome: 'Doe',
        email: 'test@example.com',
        role: UserRole.PROFISSIONAL,
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword';
      jest.spyOn(usuarioRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(EncodePassword, 'execute').mockResolvedValue(hashedPassword);
      jest.spyOn(usuarioRepository, 'create').mockResolvedValue(payload as any);

      await createUsuarioUsecase.execute(payload);

      expect(usuarioRepository.create).toHaveBeenCalledWith({
        ...payload,
        password: hashedPassword,
      });
    });
  });
});
