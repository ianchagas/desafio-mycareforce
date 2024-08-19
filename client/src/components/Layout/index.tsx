import React from "react";
import { Grid } from "./styles";
import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";
import { useUser } from "../../hooks/user";

type Props = {
  children?: React.ReactElement<any>; // Aceita um único elemento React
};

const Layout: React.FC<Props> = ({ children }) => {
  const { user } = useUser();

  return (
    <Grid>
      <MainHeader nome={user?.nome || "Usuário"} />
      <Aside />
      <Content>{children}</Content>
    </Grid>
  );
};

export default Layout;
