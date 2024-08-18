import { createContext, PropsWithChildren, useContext, useState } from "react";

interface IAuthContext {
  logged: boolean;
  signIn(email: string, password: string, passwordConfirmation: string): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem("@react-clicknurse:logged");

    return !!isLogged;
  });

  const signIn = (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    if (email === "ian@teste.com.br" && password === "123") {
      localStorage.setItem("@react-clicknurse:logged", "true");
      setLogged(true);
    } else {
      alert("Senha ou usuário inválidos!");
    }
  };

  const signOut = () => {
    localStorage.removeItem("@react-clicknurse:logged");
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
