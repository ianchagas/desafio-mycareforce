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

  async create(payload: CreateUsuarioDto): Promise<any> {
    const usuarioObject = await this.usuarioRepository.create(payload);

    return await this.usuarioRepository.save(usuarioObject);
  }

  async update(data: UpdateUsuarioDto): Promise<any> {
    return null;
  }

  async find(query: any): Promise<any> {
    return null;
  }

  async findOne(uuid: string): Promise<any> {
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

  async delete(uuid: string): Promise<any> {
    return null;
  }

  async ban(uuid: string): Promise<any> {
    return null;
  }
}
