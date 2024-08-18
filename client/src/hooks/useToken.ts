import { useEffect } from "react";
import usuariosService from "../services/usuarios.service";
import { useAuth } from "./auth";

interface IJwt {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

const useToken = () => {
  const { logged, signOut } = useAuth();

  useEffect(() => {
    const refreshToken = async () => {
      const expiresIn = sessionStorage.getItem("@react-clicknurse:expires_in");

      if (!expiresIn) {
        return;
      }

      const expirationTime = parseInt(expiresIn, 10) * 1000;
      const refreshTokenTime = expirationTime - Date.now();

      if (refreshTokenTime > 0) {
        setTimeout(async () => {
          try {
            const refresh_token = sessionStorage.getItem(
              "@react-clicknurse:refresh_token"
            );

            if (!refresh_token) {
              signOut();
              return;
            }

            const response = await usuariosService.post<IJwt>(
              "/login/refresh",
              {
                refresh_token,
              }
            );

            const {
              access_token,
              refresh_token: new_refresh_token,
              expires_in,
            } = response.data;

            sessionStorage.setItem(
              "@react-clicknurse:access_token",
              access_token
            );

            sessionStorage.setItem(
              "@react-clicknurse:refresh_token",
              new_refresh_token
            );

            sessionStorage.setItem(
              "@react-clicknurse:expires_in",
              expires_in.toString()
            );

            refreshToken();
          } catch (error) {
            console.error("Erro ao renovar o token:", error);
            signOut();
          }
        }, refreshTokenTime - 60000);
      } else {
        signOut();
      }
    };

    if (logged) {
      refreshToken();
    }
  }, [logged, signOut]);
};

export default useToken;
