import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, Plane } from 'lucide-react';
import airportBg from '../assets/airport-background.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    contact: '',
    service_id: '',
    role: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data
    setRoles([
      { id: 1, nom_role: 'ADMIN' },
      { id: 2, nom_role: 'USER' },
      { id: 3, nom_role: 'AUTRE' },
    ]);
    setServices([
      { id: 1, nom_service: 'Immigration' },
      { id: 2, nom_service: 'Police des Frontières' },
      { id: 3, nom_service: 'Douanes' },
    ]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      // Simulate registration
      alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

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
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="form-input"
                placeholder="Prénom"
              />
            </div>

            <div>
              <label className="form-label">Nom *</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="form-input"
                placeholder="Nom"
              />
            </div>

            <div>
              <label className="form-label">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="form-input"
                placeholder="+221 77 000 0000"
              />
            </div>

            <div>
              <label className="form-label">Service</label>
              <select
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Sélectionner un service</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.nom_service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Rôle</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Sélectionner un rôle</option>
                {roles.map(r => (
                  <option key={r.id} value={r.nom_role}>{r.nom_role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
                placeholder="Nom d'utilisateur"
              />
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
                  placeholder="Mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="form-label">Confirmer mot de passe *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Confirmer le mot de passe"
              />
            </div>

            <div className="col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3"
              >
                {loading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    S'inscrire
                  </>
                )}
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
