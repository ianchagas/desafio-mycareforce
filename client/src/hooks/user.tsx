import React, { createContext, useContext, useEffect, useState } from "react";
import usuariosService from "../services/usuarios.service";
import { IUsuarios } from "../utils/usuarios.interface";

interface IUserContext {
  user: IUsuarios | null;
  loading: boolean;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUsuarios | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const email = sessionStorage.getItem("@react-clicknurse:logged-email");
      const accessToken = sessionStorage.getItem(
        "@react-clicknurse:access_token"
      );

      if (accessToken) {
        try {
          const response = await usuariosService.get<IUsuarios>(
            `/usuarios/email/${email}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          console.log(response.data);
          setUser(response.data);
        } catch (error) {
          setLoading(true);
          console.error("Erro ao fazer a requisição: ", error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
