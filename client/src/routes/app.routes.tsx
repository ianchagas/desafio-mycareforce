import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PainelAdmin from "../pages/PainelAdmin";
import Layout from "../components/Layout";

const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/admin" element={<PainelAdmin />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
