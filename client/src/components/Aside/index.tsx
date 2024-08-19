import React from "react";
import { Container, Header, LogoImg, MenuContainer } from "./styles";

import logoImg from "../../assets/logo.svg";
const Aside: React.FC = () => {
  return (
    <Container>
      <Header>
        <LogoImg src={logoImg} alt="Logo ClickNurse" />
      </Header>

      <MenuContainer></MenuContainer>
    </Container>
  );
};

export default Aside;
