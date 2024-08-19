import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import usuariosService from "../../services/usuarios.service";
import UserHistory from "../../components/UserHistory";
import { IUsuarios } from "../../utils/usuarios.interface";

interface Usuario {
  id: number;
  uuid: string;
  nome: string;
  sobrenome: string;
  email: string;
  role: string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface UsuarioResponse {
  data: Usuario[];
  count: number;
}

interface PainelAdminProps {
  user: IUsuarios | null;
}

const PainelAdmin: React.FC<PainelAdminProps> = ({ user }) => {
  const [userList, setUserList] = useState<Usuario[] | null>(null);

  useEffect(() => {
    const fetchUserList = async () => {
      if (user) {
        const accessToken = sessionStorage.getItem(
          "@react-clicknurse:access_token"
        );
        try {
          const response = await usuariosService.get<UsuarioResponse>(
            "/usuarios",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setUserList(response.data.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserList();
  }, [user]);

  return (
    <Container>
      <h1>Lista de Usuários</h1>
      {userList?.map((item: Usuario) => (
        <UserHistory
          key={item.id}
          id={item.id}
          uuid={item.uuid}
          nome={item.nome}
          sobrenome={item.sobrenome}
          email={item.email}
          role={item.role}
          isBanned={item.isBanned}
        />
      ))}
    </Container>
  );
};

export default PainelAdmin;
