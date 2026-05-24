import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, Plane } from 'lucide-react';
import airportBg from '../assets/airport-background.jpg';
import { api } from "../services/api";


const API_BASE = "http://localhost:4000";

const Register = () => {

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    contact: '',
    serviceId: '',
    // role: '',
    roleId: '',
    username: '',
    password: '',
    confirmPassword: '',
    mustChangePassword: true   // ✅ NOUVEAU
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const navigate = useNavigate();

  // 🔥 Charger roles & services depuis backend
  useEffect(() => {

    const fetchData = async () => {
      try {
        // const rolesRes = await fetch(`${API_BASE}/api/admin/roles`);
        // const servicesRes = await fetch(`${API_BASE}/api/admin/services`);

        const rolesRes = await api("/api/admin/roles");
        const servicesRes = await api("/api/admin/services");

        const rolesData = await rolesRes.json();
        const servicesData = await servicesRes.json();


        // const rolesData = await rolesRes.json();
        // const servicesData = await servicesRes.json();

        setRoles(rolesData);
        setServices(servicesData);

      } catch (err) {
        console.error("Erreur chargement données", err);
      }
    };

    fetchData();

  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!formData.prenom || !formData.nom || !formData.username || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          contact: formData.contact,
          serviceId: Number(formData.serviceId),
          // role: formData.role,
          roleId: Number(formData.roleId),
          username: formData.username,
          password: formData.password,
          mustChangePassword: formData.mustChangePassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur lors de l'inscription");
        return;
      }

      alert("Inscription réussie !");
      navigate('/login');

    } catch (err) {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  //
//   if (!formData.serviceId) {
//   setError("Service obligatoire");
//   return;
// }
//

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${airportBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-card rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center mb-4">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Inscription</h1>
            <p className="text-muted-foreground mt-2">Créer un nouveau compte</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <div>
              <label className="form-label">Prénom *</label>
              <input name="prenom" value={formData.prenom} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Nom *</label>
              <input name="nom" value={formData.nom} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Contact</label>
              <input name="contact" value={formData.contact} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Service</label>
              <select name="serviceId" value={formData.serviceId} onChange={handleChange} className="form-select">
                <option value="">Sélectionner un service</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.sigle_service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Rôle</label>
              <select name="roleId" value={formData.roleId} onChange={handleChange} className="form-select">
                <option value="">Sélectionner un rôle</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>{r.nom_role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Username *</label>
              <input name="username" value={formData.username} onChange={handleChange} className="form-input" />
            </div>

            <div>
              <label className="form-label">Mot de passe *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="form-label">Confirmer mot de passe *</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-input" />
            </div>

            {/* ✅ CASE A COCHER */}
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                name="mustChangePassword"
                checked={formData.mustChangePassword}
                onChange={handleChange}
              />
              <label>Modifier le mot de passe au premier connexion</label>
            </div>

            <div className="col-span-2">
              <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                {loading ? "⏳" : <><UserPlus className="w-4 h-4" /> S'inscrire</>}
              </button>
            </div>

          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-primary hover:underline text-sm">
              Déjà un compte? Se connecter
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
