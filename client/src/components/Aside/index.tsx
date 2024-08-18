import React from "react";
import {
  Container,
  Header,
  LogoImg,
  Title,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
} from "./styles";

import { MdDashboard, MdExitToApp } from "react-icons/md";
import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";

const Aside: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt="Logo ClickNurse" />
        <Title>Admin</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/admin">
          <MdDashboard />
          Admin
        </MenuItemLink>

        <MenuItemButton onClick={signOut}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>
    </Container>
  );
};

export default Aside;
