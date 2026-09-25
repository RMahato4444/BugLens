import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authApi";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [
    user,
    setUser,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((result) => {
        if (!active) {
          return;
        }

        setUser(
          result.user,
        );
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setUser(null);
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const login =
    async ({
      email,
      password,
      rememberMe,
    }) => {
      const result =
        await loginUser({
          email,
          password,
          rememberMe,
        });

      setUser(
        result.user,
      );

      return result.user;
    };

  const register =
    async ({
      name,
      email,
      password,
      agreeToTerms,
    }) => {
      const result =
        await registerUser({
          name,
          email,
          password,
          agreeToTerms,
        });

      setUser(
        result.user,
      );

      return result.user;
    };

  const logout =
    async () => {
      try {
        await logoutUser();
      } finally {
        setUser(null);
      }
    };

  const value =
    useMemo(
      () => ({
        user,

        isAuthenticated:
          Boolean(user),

        isLoading,

        login,

        register,

        logout,
      }),
      [
        user,
        isLoading,
      ],
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(
      AuthContext,
    );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
}