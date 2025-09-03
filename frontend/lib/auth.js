"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authAPI.getCurrentUser());
  const [loading, setLoading] = useState(false);

  const signup = async (formData) => {
    setLoading(true);
    try {
      const data = await authAPI.signup(formData);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authAPI.login(credentials);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
  try {
    await authAPI.logout();
  } catch (e) {
    console.error("Logout failed", e);
  } finally {
    setUser(null);
  }
};


  useEffect(() => {
  const fetchUser = async () => {
    try {
      const data = await authAPI.getCurrentUser();
      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };
  fetchUser();
}, []);


  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
