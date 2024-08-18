import { IUsuarioRepository } from '@app/usuarios/implementation/usuario.interface';
import { Injectable } from '@nestjs/common';
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

  async update(data: UpdateUsuarioDto): Promise<any> {
    return null;
  }

  async find(
    searchFilter: string,
  ): Promise<{ data: UsuariosEntity[]; count: number }> {
    if (!searchFilter) {
      const usuarios = await this.usuarioRepository.findAndCount();

      return {
        data: usuarios[0],
        count: usuarios[1],
      };
    }

    const searchTerm = `usuarios.id || ';' || usuarios.nome || ';' || usuarios.sobrenome || ';' || usuarios.email || ';' || usuarios.role`;

    const usuarios = await this.usuarioRepository
      .createQueryBuilder('usuarios')
      .where(`${searchTerm} ILIKE :searchFilter`, {
        searchFilter: `%${searchFilter}%`,
      })
      .getManyAndCount();

    return {
      data: usuarios[0],
      count: usuarios[1],
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
    });

    if (emailExists) {
      return emailExists;
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

  async ban(uuid: string): Promise<any> {
    return null;
  }
}
