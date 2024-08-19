import React, { useState } from "react";
import usuariosService from "../../services/usuarios.service";
import { Container, Form } from "./styles";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";

const CriarUsuario: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("PROFISSIONAL");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    const newUser = {
      nome,
      sobrenome,
      email,
      role,
      password,
    };

    const accessToken = sessionStorage.getItem(
      "@react-clicknurse:access_token"
    );

    try {
      await usuariosService.post("/usuarios", newUser, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <Container>
      <h1>Criar Novo Usuário</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(event) => setSobrenome(event.target.value)}
          required
        />
        <Select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          required
          options={[
            { value: "PROFISSIONAL", label: "Profissional" },
            { value: "GESTOR", label: "Gestor" },
          ]}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Button type="submit">Criar Usuário</Button>
      </Form>
    </Container>
  );
};

export default CriarUsuario;
