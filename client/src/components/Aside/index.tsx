import React from "react";
import {
  Container,
  Header,
  LogoImg,
  MenuContainer,
  MenuItemLink,
} from "./styles";

import logoImg from "../../assets/logo.svg";
import {
  MdCreate,
  MdDashboard,
  MdDelete,
  MdList,
  MdUpdate,
} from "react-icons/md";
import { IUsuarios } from "../../utils/usuarios.interface";
interface AsideProps {
  user: IUsuarios | null;
}
const Aside: React.FC<AsideProps> = ({ user }) => {
  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt="Logo ClickNurse" />
      </Header>

      {user?.role === "ADMIN" && (
        <MenuContainer>
          <MenuItemLink>
            <MdDashboard />
            Inicio
          </MenuItemLink>
          <MenuItemLink>
            <MdCreate />
            Criar
          </MenuItemLink>
          <MenuItemLink>
            <MdUpdate />
            Atualizar
          </MenuItemLink>
          <MenuItemLink>
            <MdList />
            Listar
          </MenuItemLink>
          <MenuItemLink>
            <MdDelete />
            Banir
          </MenuItemLink>
        </MenuContainer>
      )}
    </Container>
  );
};

export default Aside;
