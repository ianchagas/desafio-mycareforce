import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto/user.dto';
import { UsuariosEntity } from '../infra/typeorm/entity/usuarios.entity';

export interface IUsuarioRepository {
  create(data: CreateUsuarioDto): Promise<UsuariosEntity>;
  update(data: UpdateUsuarioDto): Promise<any>;
  find(query: any): Promise<{ data: UsuariosEntity[]; count: number }>;
  findOne(uuid: string): Promise<any>;
  findByEmail(email: string): Promise<UsuariosEntity>;
  delete(uuid: string): Promise<any>;
  ban(uuid: string): Promise<any>;
}
