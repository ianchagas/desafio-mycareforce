import React from "react";
import { Container, Profile, Welcome, LogoutButton } from "./styles";
import { useAuth } from "../../hooks/auth";
import { MdExitToApp } from "react-icons/md";

type MainHeaderProps = {
  nome: string;
};

const MainHeader: React.FC<MainHeaderProps> = ({ nome }) => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Profile>
        <Welcome>Olá, {nome}</Welcome>
      </Profile>
      <LogoutButton onClick={signOut}>
        <MdExitToApp />
      </LogoutButton>
    </Container>
  );
};

export default MainHeader;
