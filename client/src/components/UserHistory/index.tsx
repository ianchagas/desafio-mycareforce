import React, { useEffect, useState } from "react";
import { Container, UserItem, BanButton } from "./styles";
import usuariosService from "../../services/usuarios.service";
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

interface UserHistoryProps {
  user: IUsuarios | null;
}

const UserHistory: React.FC<UserHistoryProps> = ({ user }) => {
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

  const handleBanUser = async (uuid: string) => {
    console.log(uuid);
    const accessToken = sessionStorage.getItem(
      "@react-clicknurse:access_token"
    );
    try {
      await usuariosService.put(
        `/usuarios/ban/${uuid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserList(
        (prevUserList) =>
          prevUserList?.map((item) =>
            item.uuid === uuid ? { ...item, isBanned: !item.isBanned } : item
          ) || null
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      {userList?.map((item: Usuario) => (
        <UserItem key={item.id} isBanned={item.isBanned}>
          <div>
            <span>UUID: {item.uuid}</span>
            <small>
              Nome: {item.nome} {item.sobrenome}
            </small>
            <small>Email: {item.email}</small>
            <small>Role: {item.role}</small>
          </div>
          <div>
            <span className="status">
              {item.isBanned ? "Banned" : "Active"}
            </span>
            <BanButton onClick={() => handleBanUser(item.uuid)}>
              {item.isBanned ? "" : "Ban"}
            </BanButton>
          </div>
        </UserItem>
      ))}
    </Container>
  );
};

export default UserHistory;
