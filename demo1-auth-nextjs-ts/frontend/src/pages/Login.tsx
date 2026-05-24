import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Eye, EyeOff, Plane } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import airportBg from "../assets/airport-background.jpg";

const API_LOGIN = "http://localhost:4000/api/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      // ❌ Gestion erreurs backend (actif=false, mauvais mot de passe, etc.)
      if (!response.ok) {
        setError(data.error || "Erreur de connexion");
        setLoading(false);
        return;
      }

      // 🔐 Sauvegarde tokens
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // 🔑 Mise à jour contexte utilisateur
      login(data.user, data.accessToken);

      // 🔥 Forcer changement mot de passe si nécessaire
      if (data.mustChangePassword) {
        navigate("/change-password");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("Erreur serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${airportBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center mb-4">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Connexion
            </h1>
            <p className="text-muted-foreground mt-2">
              Gestion du Flux Migratoire
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="form-label">Nom d'utilisateur</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? (
                "⏳ Connexion..."
              ) : (
                <>
                  <LogIn size={16} />
                  Se connecter
                </>
              )}
            </button>

          </form>

          <div className="mt-6 text-center">
            <Link to="/register" className="text-primary hover:underline text-sm">
              Pas encore de compte ? S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
