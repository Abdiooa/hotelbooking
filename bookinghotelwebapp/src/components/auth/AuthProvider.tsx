import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  token: string | null;
  username: string | null;
  userRole: string | null;
  userId: string | null;
}

interface AuthContextType {
  authState: AuthState;
  handleLogin: (
    token: string,
    username: string,
    userRole: string,
    userId: string
  ) => void;
  handleLogout: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");
    return {
      token,
      username,
      userRole,
      userId,
    };
  });

  const handleLogin = (
    token: string,
    username: string,
    userRole: string,
    userId: string
  ) => {
    setAuthState({
      token,
      username,
      userRole,
      userId,
    });
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userId", userId);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuthState({
      token: null,
      username: null,
      userRole: null,
      userId: null,
    });
  };

  const isLoggedIn = () => {
    const token = authState.token;
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.exp * 1000 > Date.now();
      } catch (error) {
        console.error("Invalid token", error);
        return false;
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{ authState, handleLogin, handleLogout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
