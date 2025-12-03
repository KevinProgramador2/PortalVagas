import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PropTypes from "prop-types";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isUserAuthenticated } = useAuth();

  return !isAuthenticated && !isUserAuthenticated ? (
    children
  ) : (
    <Navigate to="/portal-de-vagas" />
  );
};

export default PublicRoute;
