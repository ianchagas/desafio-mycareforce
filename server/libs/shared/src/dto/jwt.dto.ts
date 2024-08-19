import { UserRole } from '../enum/userRole.enum';

export class JwtDecodeDto {
  data: {
    uuid: string;
    nome: string;
    sobrenome: string;
    email: string;
    role: UserRole;
    isBanned: boolean;
  };
}

export class JwtObjectDto {
  uuid: string;
  nome: string;
  sobrenome: string;
  email: string;
  role: UserRole;
  isBanned: boolean;
}

export class JwtDto {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
