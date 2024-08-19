import React from "react";
import { Container } from "./styles";
import { useUser } from "../../hooks/user";

const PainelAdmin: React.FC = () => {
  const { user } = useUser();

  return (
    <Container>
      <h1>{user?.email}</h1>
    </Container>
  );
};

export default PainelAdmin;
