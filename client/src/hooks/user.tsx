// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import usuariosService from "../services/usuarios.service";
import { IUsuarios } from "../utils/usuarios.interface";

interface IUserContext {
  user: IUsuarios | null;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUsuarios | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const email = sessionStorage.getItem("@react-clicknurse:logged-email");
      if (email) {
        try {
          const response = await usuariosService.get<IUsuarios>(
            `/usuarios/email/${email}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Erro ao fazer a requisição: ", error);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
