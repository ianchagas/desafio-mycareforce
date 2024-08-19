import React from "react";
import { Container, Header, LogoImg } from "./styles";

import logoImg from "../../assets/logo.svg";
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
    </Container>
  );
};

export default Aside;
