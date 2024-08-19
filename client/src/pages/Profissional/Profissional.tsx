import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import usuariosService from "../../services/usuarios.service";
import {
  Container,
  EmpresaList,
  EmpresaItem,
  VagaList,
  VagaItem,
} from "../Profissional/styles";
import { useAuth } from "../../hooks/auth";

const Profissional: React.FC = () => {
  const { signOut } = useAuth();
  const [empresas, setEmpresas] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpresas = async () => {
      const accessToken = sessionStorage.getItem(
        "@react-clicknurse:access_token"
      );
      if (accessToken) {
        try {
          const response = await usuariosService.get<any>(
            "/dados/profissional",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setEmpresas(response.data.data);
        } catch (error: any) {
          if (error.data.statusCode === 401) {
            alert(error.data.message);
            signOut();
          } else {
            alert({
              error: error.data.message,
              statusCode: error.data.statusCode,
            });
          }
        }
      } else {
        signOut();
      }
    };

    fetchEmpresas();

    const intervalId = setInterval(fetchEmpresas, 5000);

    return () => clearInterval(intervalId);
  }, [navigate, signOut]);

  return (
    <Container>
      <h1>Bem-vindo à página de Profissional!</h1>
      <h2>Vagas abertas</h2>
      {empresas.length > 0 ? (
        empresas.map((empresa) => (
          <EmpresaList key={empresa.id}>
            <EmpresaItem>
              <h2>{empresa.empresa}</h2>
              <p>Tipo de contratação: {empresa.tipo_contratacao}</p>
              <h3>Vagas:</h3>
              <VagaList>
                {empresa.vagas.map((vaga: any) => (
                  <VagaItem key={vaga.id}>
                    <p>Vaga: {vaga.vaga}</p>
                    <p>Quantidade: {vaga.qtde}</p>
                    <p>Valor por hora: R$ {vaga.valor_hora}</p>
                  </VagaItem>
                ))}
              </VagaList>
            </EmpresaItem>
          </EmpresaList>
        ))
      ) : (
        <p>Nenhuma empresa encontrada</p>
      )}
    </Container>
  );
};

export default Profissional;
