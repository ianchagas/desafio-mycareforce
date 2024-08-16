import React, { useState } from "react";
import {
  Container,
  Header,
  LogoImg,
  Title,
  MenuContainer,
  MenuItemLink,
  MenuItemButton,
  ToogleMenu,
  ThemeToggleFooter,
} from "./styles";

import { MdDashboard, MdExitToApp, MdClose, MdMenu } from "react-icons/md";
import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";

const Aside: React.FC = () => {
  const { signOut } = useAuth();

  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToogleMenu onClick={handleToggleMenu}>
          {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </ToogleMenu>
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

      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened} />
    </Container>
  );
};

export default Aside;
