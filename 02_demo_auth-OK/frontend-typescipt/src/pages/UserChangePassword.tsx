import { useState } from "react";
import { Key, Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { notifySuccess, notifyError } from "../utils/toast";

const UserChangePassword = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      const response = await api("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors du changement de mot de passe");
        setLoading(false);
        return;
      }

      // ✅ Mise à jour du user en mémoire (désactive mustChangePassword)
      login(
        { ...user!, mustChangePassword: false },
        localStorage.getItem("token")!
      );

      notifySuccess("Mot de passe modifié avec succès");

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      // 🔥 Redirection vers dashboard
      navigate("/");

    } catch (err) {
      notifyError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Changer mon mot de passe
          </h1>
          <p className="text-muted-foreground mt-2">
            Connecté en tant que: <strong>{user?.username}</strong>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Ancien mot de passe */}
          <div>
            <label className="form-label">Ancien mot de passe</label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                className="form-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Nouveau mot de passe */}
          <div>
            <label className="form-label">Nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="form-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirmation */}
          <div>
            <label className="form-label">Confirmer le nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-6"
          >
            {loading ? "⏳ Modification..." : (
              <>
                <Key size={16} />
                Changer le mot de passe
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default UserChangePassword;
