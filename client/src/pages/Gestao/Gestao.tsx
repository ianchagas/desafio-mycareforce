import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import usuariosService from "../../services/usuarios.service";
import { Container, ProfissionalItem, ProfissionalList } from "./styles";

const Gestao: React.FC = () => {
  const [profissionais, setProfissionais] = useState<any[]>([]);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchProfissionais = async () => {
      const accessToken = sessionStorage.getItem(
        "@react-clicknurse:access_token"
      );
      if (accessToken) {
        try {
          const response = await usuariosService.get<any>("/dados/gestor", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setProfissionais(response.data.data);
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            navigate("/");
          } else {
            console.error("Erro ao fazer a requisição: ", error);
            alert(error.data.message);
            sessionStorage.clear();
            navigate("/");
          }
        }
      } else {
        sessionStorage.clear();
        navigate("/");
      }
    };

    fetchProfissionais();

    const intervalId = setInterval(fetchProfissionais, 30000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <Container>
      <h1>Bem-vindo à página de Gestor!</h1>
      <h2>Profissionais disponíveis</h2>
      {profissionais.length > 0 ? (
        profissionais.map((profissional) => (
          <ProfissionalList key={profissional.id}>
            <h2>{profissional.nome}</h2>
            <ProfissionalItem>
              <p>Profissão: {profissional.profissao}</p>
              <p>Tempo exp: {profissional.tempo_experiencia}</p>
              <p>Valor hora: {profissional.valor_hora}</p>
            </ProfissionalItem>
          </ProfissionalList>
        ))
      ) : (
        <p>Nenhum profissional encontrada</p>
      )}
    </Container>
  );
};

export default Gestao;
