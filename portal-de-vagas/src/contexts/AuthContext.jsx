import React, { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const adminCredentials = {
    username: "admin",
    password: "password123",
  };

  const userCredentials = {
    username: "user",
    password: "user123",
  };

  const login = (username, password) => {
    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("user", username);
      return true;

      //login
    }
    return false;
  };

  const loginUser = (username, password) => {
    if (
      username === userCredentials.username &&
      password === userCredentials.password
    ) {
      setIsUserAuthenticated(true);
      localStorage.setItem("user", username);
      return true;
    }
    return false;
  };

  //loginUser

  const logout = () => {
    setIsAuthenticated(false);
    setIsUserAuthenticated(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    setLoadingUser(true);
    const saved = localStorage.getItem("user");
    console.log(saved);
    if (saved === "user") {
      setIsUserAuthenticated(true);
    } else if (saved === "admin") {
      setIsAuthenticated(true);
    }
    setLoadingUser(false);
  }, [isAuthenticated, isUserAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isUserAuthenticated,
        login,
        loginUser,
        logout,
        loadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
