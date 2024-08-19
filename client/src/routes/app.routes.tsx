import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PainelAdmin from "../pages/PainelAdmin";
import { useUser } from "../hooks/user";
import Layout from "../components/Layout";
import Profissional from "../pages/Profissional/Profissional";
import Gestao from "../pages/Gestao/Gestao";

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "PROFISSIONAL") {
        navigate("/profissional");
      } else if (user.role === "GESTOR") {
        navigate("/gestor");
      }
    }
  }, [user, navigate]);

  return (
    <Layout user={user}>
      <Routes>
        <Route path="/admin" element={<PainelAdmin user={user} />} />
        <Route path="/profissional" element={<Profissional />} />
        <Route path="/gestor" element={<Gestao />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
