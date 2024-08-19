import React from "react";
import { Container, Profile, Welcome, LogoutButton } from "./styles";
import { useAuth } from "../../hooks/auth";
import { MdExitToApp } from "react-icons/md";

const MainHeader: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Profile>
        <Welcome>Olá, usuario</Welcome>
      </Profile>
      <LogoutButton onClick={signOut}>
        <MdExitToApp />
      </LogoutButton>
    </Container>
  );
};

export default MainHeader;
