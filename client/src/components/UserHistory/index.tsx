import { Container } from "./styles";

interface IUsuarioProps {
  id: number;
  uuid: string;
  nome: string;
  sobrenome: string;
  email: string;
  role: string;
  isBanned: boolean;
}

const UserHistory: React.FC<IUsuarioProps> = ({
  uuid,
  nome,
  sobrenome,
  email,
  role,
  isBanned,
}) => {
  return (
    <Container>
      <div>
        <span>UUID: {uuid}</span>
        <small>
          Nome: {nome} {sobrenome}
        </small>
        <small>Email: {email}</small>
        <small>Role: {role}</small>
      </div>
      <span>{isBanned ? "Banned" : "Active"}</span>
    </Container>
  );
};

export default UserHistory;
