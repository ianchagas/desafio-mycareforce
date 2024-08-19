import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from '@app/redis/redis.service';
import { UsuarioRepository } from '@app/usuarios/infra/typeorm/repository/usuario.repository';
import { BadRequestException } from '@nestjs/common';
import { BanUsuarioUsecase } from './ban';
import { UsuariosEntity } from '@app/usuarios/infra/typeorm/entity/usuarios.entity';

describe('BanUsuarioUsecase', () => {
  let banUsuarioUsecase: BanUsuarioUsecase;
  let usuarioRepository: UsuarioRepository;
  let redisService: RedisService;

  beforeEach(async () => {
    const mockUsuarioRepository = {
      findOne: jest.fn(),
      ban: jest.fn(),
    };

    const mockRedisService = {
      updateBannedStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BanUsuarioUsecase,
        { provide: UsuarioRepository, useValue: mockUsuarioRepository },
        { provide: RedisService, useValue: mockRedisService },
      ],
    }).compile();

    banUsuarioUsecase = module.get<BanUsuarioUsecase>(BanUsuarioUsecase);
    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
    redisService = module.get<RedisService>(RedisService);
  });

  it('Should be defined', () => {
    expect(banUsuarioUsecase).toBeDefined();
  });

  describe('Execute Method', () => {
    it('Should throw an exception if user does not exist', async () => {
      const uuid = 'any-uuid';
      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(null);

      await expect(banUsuarioUsecase.execute(uuid)).rejects.toThrow(
        new BadRequestException('Usuário já encontra-se banido ou excluído.'),
      );
    });

    it('Should call ban repository and update status in redis if user exists', async () => {
      const uuid = 'any-uuid';
      const user = new UsuariosEntity();
      user.email = 'test@example.com';

      jest.spyOn(usuarioRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(usuarioRepository, 'ban').mockResolvedValue(undefined);
      jest
        .spyOn(redisService, 'updateBannedStatus')
        .mockResolvedValue(undefined);

      await banUsuarioUsecase.execute(uuid);

      expect(usuarioRepository.findOne).toHaveBeenCalledWith(uuid);
      expect(usuarioRepository.ban).toHaveBeenCalledWith(uuid);
      expect(redisService.updateBannedStatus).toHaveBeenCalledWith(
        user.email,
        true,
      );
    });
  });
});
