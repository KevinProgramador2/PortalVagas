import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ApplyPage from "../pages/ApplyPage/ApplyPage";
import PrivateRoute from "./PrivateRoute";
import CurriculumPage from "../pages/CurriculumPage/CurriculumPage";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/portal-de-vagas" element={<HomePage />} />
      <Route
        path="/portal-de-vagas/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route path="/portal-de-vagas/apply/:id" element={<ApplyPage />} />
      <Route
        path="/portal-de-vagas/admin"
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/portal-de-vagas/curriculo"
        element={
          <PrivateRoute>
            <CurriculumPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
