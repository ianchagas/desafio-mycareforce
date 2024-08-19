import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PainelAdmin from "../pages/PainelAdmin";
import { useUser } from "../hooks/user";
import Layout from "../components/Layout";
import Profissional from "../pages/Profissional/Profissional";
import Gestao from "../pages/Gestao/Gestao";

const AppRoutes: React.FC = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (user.role === "ADMIN") {
          navigate("/admin", { replace: true });
        } else if (user.role === "PROFISSIONAL") {
          navigate("/profissional", { replace: true });
        } else if (user.role === "GESTOR") {
          navigate("/gestor", { replace: true });
        }
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;

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
