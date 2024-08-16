import React, { useState } from "react";
import { Container, Logo, Form, FormTitle } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signIn } = useAuth();

  return (
    <Container>
      <Logo>
        <img src={logImg} alt="Click Nurse" />
      </Logo>
      <Form onSubmit={() => signIn(email, password)}>
        <FormTitle>Entrar</FormTitle>
        <Input
          placeholder="Email"
          type="email"
          required
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

export default SignIn;
