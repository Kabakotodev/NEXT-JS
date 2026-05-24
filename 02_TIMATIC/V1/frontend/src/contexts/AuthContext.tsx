import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// interface UserPayload {
//   id: number;
//   role: string;
//   exp: number;
// }

interface UserPayload {
  id: number;
  role: string;
  prenom: string;
  nom: string;
  exp: number;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  passwordWarning?: string;
}

interface AuthContextType {
  user: UserPayload | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API = "http://localhost:5000/api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserPayload | null>(null);

  // 🔐 Fonction logout centralisée
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  // 🔄 Fonction refresh automatique
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const res = await axios.post(`${API}/auth/refresh`, {
        refreshToken,
      });

      const { accessToken } = res.data;

      localStorage.setItem("accessToken", accessToken);

      const payload: UserPayload = JSON.parse(
        atob(accessToken.split(".")[1])
      );

      localStorage.setItem("user", JSON.stringify(payload));
      setUser(payload);

    } catch {
      logout();
    }
  };

  // 🔐 Vérification au démarrage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) return;

    try {
      const payload: UserPayload = JSON.parse(
        atob(token.split(".")[1])
      );

      const currentTime = Date.now() / 1000;

      if (payload.exp > currentTime) {
        setUser(payload);
      } else {
        // 🔄 Token expiré → tenter refresh
        refreshAccessToken();
      }
    } catch {
      logout();
    }
  }, []);

  // 🔄 Vérification automatique toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const payload: UserPayload = JSON.parse(
          atob(token.split(".")[1])
        );

        const currentTime = Date.now() / 1000;

        if (payload.exp < currentTime) {
          refreshAccessToken();
        }
      } catch {
        logout();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // ⏳ Inactivité 15 minutes
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        logout();
        alert("Session expirée après 15 minutes d'inactivité.");
      }, 15 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${API}/auth/login`,
        { username, password }
      );

      const { accessToken, refreshToken, passwordWarning } =
        response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const payload: UserPayload = JSON.parse(
        atob(accessToken.split(".")[1])
      );

      localStorage.setItem("user", JSON.stringify(payload));
      setUser(payload);

      if (passwordWarning) {
        alert(passwordWarning);
      }

      return { success: true };

    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Erreur de connexion",
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};