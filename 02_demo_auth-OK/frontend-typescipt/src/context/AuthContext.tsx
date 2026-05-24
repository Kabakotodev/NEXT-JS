import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

interface User {
  id: number;
  prenom: string;
  nom: string;
  username: string;
  role: string;
  service_id: number;
  actif: boolean;
  mustChangePassword: boolean;   // ✅ AJOUT
}


interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = (userData: User, tokenData: string) => {
    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(tokenData);
    setUser(userData);
  };

  const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken })
      });
    }

    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  // 🔐 Vérification expiration JWT
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          logout();
        }
      } catch (err) {
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};

//
