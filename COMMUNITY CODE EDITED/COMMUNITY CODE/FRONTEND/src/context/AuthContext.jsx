import { createContext, useContext, useEffect, useState } from "react";

import { apiRequest } from "../api/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "community_code_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurrentUser = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data.user);
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentUser();
  }, []);

  async function register({
  name,
  email,
  username,
  phone,
  password,
  language = "en",
}) {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({
  name,
  email,
  username,
  phone,
  password,
  language,
}),
    });

    return data.user;
  }

  async function login(identifier, password) {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    localStorage.setItem(TOKEN_KEY, data.token);

    setUser(data.user);

    return data.user;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }

async function updateProfile(updates) {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw new Error("You are not authenticated.");
  }

  const data = await apiRequest("/users/me", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  setUser(data.user);

  return data.user;
}

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}