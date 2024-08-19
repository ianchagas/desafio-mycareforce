import React from "react";
import { Grid } from "./styles";
import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";
// import { useUser } from "../../hooks/user";
import { IUsuarios } from "../../utils/usuarios.interface";

// type Props = {
//   children?: React.ReactElement<any>;
// };

interface LayoutProps {
  user: IUsuarios | null;
  children?: React.ReactElement<any>;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  return (
    <Grid>
      <MainHeader nome={user?.nome || "Usuário"} />
      <Aside user={user} />
      <Content>{children}</Content>
    </Grid>
  );
};

export default Layout;
