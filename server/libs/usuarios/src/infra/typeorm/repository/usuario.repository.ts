import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosEntity } from '../entity/usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto, UpdateUsuarioDto } from '@app/usuarios/dto/user.dto';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(
    @InjectRepository(UsuariosEntity)
    private usuarioRepository: Repository<UsuariosEntity>,
  ) {}

  async create(payload: CreateUsuarioDto): Promise<UsuariosEntity> {
    const usuarioObject = await this.usuarioRepository.create(payload);

    return await this.usuarioRepository.save(usuarioObject);
  }

  async update(uuid: string, payload: UpdateUsuarioDto): Promise<void> {
    await this.usuarioRepository
      .createQueryBuilder()
      .update(payload)
      .where({ uuid })
      .returning([])
      .execute();
  }

  async find(
    searchFilter: string,
  ): Promise<{ data: UsuariosEntity[]; count: number }> {
    if (!searchFilter) {
      const [data, count] = await this.usuarioRepository.findAndCount();

      return {
        data,
        count,
      };
    }

    const searchTerm = `usuarios.id || ';' || usuarios.nome || ';' || usuarios.sobrenome || ';' || usuarios.email || ';' || usuarios.role`;

    const [data, count] = await this.usuarioRepository
      .createQueryBuilder('usuarios')
      .where(`${searchTerm} ILIKE :searchFilter`, {
        searchFilter: `%${searchFilter}%`,
      })
      .getManyAndCount();

    return {
      data,
      count,
    };
  }

  async findOne(uuid: string): Promise<UsuariosEntity> {
    const usuarioExists = await this.usuarioRepository.findOne({
      where: {
        uuid: uuid,
        deletedAt: null,
        isBanned: false,
      },
    });

    if (usuarioExists) {
      return usuarioExists;
    }

    return null;
  }

  async findByEmail(email: string): Promise<UsuariosEntity> {
    const emailExists = await this.usuarioRepository.findOne({
      where: {
        email,
      },
      withDeleted: true,
    });

    if (emailExists) {
      return emailExists;
    }

    return null;
  }

  async findByEmailPassword(
    email: string,
    password: string,
  ): Promise<UsuariosEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        email,
        password,
      },
    });

    if (usuario) {
      return usuario;
    }

    return null;
  }

  async delete(usuario: UsuariosEntity): Promise<void> {
    const softRemove = await this.usuarioRepository.softRemove(usuario);

    if (softRemove) {
      return null;
    }

    return null;
  }

  async ban(uuid: string): Promise<void> {
    await this.usuarioRepository
      .createQueryBuilder()
      .update({
        isBanned: true,
        deletedAt: new Date(),
      })
      .where({ uuid })
      .returning([])
      .execute();
  }
}
