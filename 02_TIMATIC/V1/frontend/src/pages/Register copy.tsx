import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi, rolesApi, servicesApi } from "@/services/api";
import { Role, Service } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, UserPlus, AlertCircle, CheckCircle } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    contact: "",
    username: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    serviceId: "",
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    rolesApi.getAll().then(setRoles).catch(() => {});
    servicesApi.getAll().then(setServices).catch(() => {});
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.prenom || !form.nom || !form.contact || !form.username || !form.password || !form.roleId || !form.serviceId) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        prenom: form.prenom,
        nom: form.nom,
        contact: form.contact,
        username: form.username,
        password: form.password,
        roleId: parseInt(form.roleId),
        serviceId: parseInt(form.serviceId),
      });
      setSuccess("Compte créé avec succès ! Redirection vers la connexion...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-lg card-elevated">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
            <Globe className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-display">Inscription</CardTitle>
            <CardDescription className="mt-1">Créez votre compte — Immigration Sénégal</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-700 text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom *</Label>
                <Input id="prenom" value={form.prenom} onChange={(e) => handleChange("prenom", e.target.value)} placeholder="Votre prénom" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input id="nom" value={form.nom} onChange={(e) => handleChange("nom", e.target.value)} placeholder="Votre nom" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact *</Label>
              <Input id="contact" value={form.contact} onChange={(e) => handleChange("contact", e.target.value)} placeholder="Numéro de téléphone" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur *</Label>
              <Input id="username" value={form.username} onChange={(e) => handleChange("username", e.target.value)} placeholder="Choisissez un identifiant" autoComplete="username" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input id="password" type="password" value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder="Min. 6 caractères" autoComplete="new-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer *</Label>
                <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} placeholder="Confirmez le mot de passe" autoComplete="new-password" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rôle *</Label>
                <Select value={form.roleId} onValueChange={(v) => handleChange("roleId", v)}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.id} value={String(r.id)}>{r.nomRole}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Service *</Label>
                <Select value={form.serviceId} onValueChange={(v) => handleChange("serviceId", v)}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.nomService}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              <UserPlus className="w-4 h-4 mr-2" />
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">Se connecter</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
