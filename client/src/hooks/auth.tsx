import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import usuariosService from "../services/usuarios.service";

interface IAuthContext {
  logged: boolean;
  signIn(email: string, password: string, passwordConfirmation: string): void;
  signOut(): void;
}

interface IJwt {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const accessToken = sessionStorage.getItem(
      "@react-clicknurse:access_token"
    );
    return !!accessToken;
  });

  useEffect(() => {
    // Revalida o estado `logged` ao montar o componente
    const accessToken = sessionStorage.getItem(
      "@react-clicknurse:access_token"
    );
    if (accessToken) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  const signIn = async (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    if (password !== passwordConfirmation) {
      alert("Passwords diferentes");
      return;
    }

    try {
      const response = await usuariosService.post<IJwt>("/login", {
        email,
        password,
        passwordConfirmation,
      });

      const { access_token, refresh_token, expires_in } = response.data;

      sessionStorage.setItem("@react-clicknurse:logged", "true");
      sessionStorage.setItem("@react-clicknurse:logged-email", email);
      sessionStorage.setItem("@react-clicknurse:access_token", access_token);
      sessionStorage.setItem("@react-clicknurse:refresh_token", refresh_token);
      sessionStorage.setItem("@react-clicknurse:expires_in", expires_in);

      setLogged(true);
    } catch (error) {
      alert("Erro no login: " + error);
    }
  };

  const signOut = async () => {
    try {
      const email = sessionStorage.getItem("@react-clicknurse:logged-email");
      if (email) {
        await usuariosService.post("/logout", { email });
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }

    sessionStorage.removeItem("@react-clicknurse:logged");
    sessionStorage.removeItem("@react-clicknurse:logged-email");
    sessionStorage.removeItem("@react-clicknurse:access_token");
    sessionStorage.removeItem("@react-clicknurse:refresh_token");
    sessionStorage.removeItem("@react-clicknurse:expires_in");

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
