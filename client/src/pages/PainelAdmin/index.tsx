import React from "react";
import { Container } from "./styles";
import CriarUsuario from "../../components/CriarUsuario";
import UserHistory from "../../components/UserHistory";
import { IUsuarios } from "../../utils/usuarios.interface";

interface PainelAdminProps {
  user: IUsuarios | null;
}

const PainelAdmin: React.FC<PainelAdminProps> = ({ user }) => {
  return (
    <Container>
      <CriarUsuario />
      <br />
      <br />
      <h1>Lista de Usuários</h1>
      <UserHistory user={user} />
    </Container>
  );
};

export default PainelAdmin;
