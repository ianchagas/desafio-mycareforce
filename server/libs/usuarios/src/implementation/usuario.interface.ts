import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto/user.dto';
import { UsuariosEntity } from '../infra/typeorm/entity/usuarios.entity';

export interface IUsuarioRepository {
  create(data: CreateUsuarioDto): Promise<any>;
  update(data: UpdateUsuarioDto): Promise<any>;
  find(query: any): Promise<any>;
  findOne(uuid: string): Promise<any>;
  findByEmail(email: string): Promise<UsuariosEntity>;
  delete(uuid: string): Promise<any>;
  ban(uuid: string): Promise<any>;
}
