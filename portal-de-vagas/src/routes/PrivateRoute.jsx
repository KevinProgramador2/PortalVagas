import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isUserAuthenticated } = useAuth();

  return isAuthenticated || isUserAuthenticated ? (
    children
  ) : (
    <Navigate to="/portal-de-vagas/login" />
  );
};

export default PrivateRoute;
