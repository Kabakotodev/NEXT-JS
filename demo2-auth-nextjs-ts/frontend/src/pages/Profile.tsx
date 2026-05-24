import { User, Mail, Phone, Building, Shield, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          <h1 className="page-title">Mon Profil</h1>
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-blue-400" />
        <div className="px-6 pb-6">
          <div className="relative -mt-16 mb-4">
            <div className="w-32 h-32 rounded-full bg-card border-4 border-card shadow-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">
                {user?.prenom?.[0]}{user?.nom?.[0] || 'U'}
              </span>
            </div>
          </div>
          <h2 className="text-2xl font-heading font-bold">
            {user ? `${user.prenom} ${user.nom}` : 'Utilisateur'}
          </h2>
          <p className="text-muted-foreground">{user?.username || 'username'}</p>
          <span className={`inline-flex mt-2 badge ${
            user?.role === 'ADMIN' ? 'badge-danger' : 
            user?.role === 'USER' ? 'badge-primary' : 'badge-warning'
          }`}>
            {user?.role || 'USER'}
          </span>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid gap-4">
        <div className="bg-card rounded-xl shadow-sm border border-border p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="font-medium">{user?.username || 'Non défini'}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Building className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Service</p>
              <p className="font-medium">Service ID: {user?.service_id || 'Non défini'}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rôle</p>
              <p className="font-medium">{user?.role || 'Non défini'}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Statut</p>
              <p className="font-medium">
                <span className={`badge ${user?.actif ? 'badge-success' : 'badge-danger'}`}>
                  {user?.actif ? 'Actif' : 'Inactif'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a href="/change-password" className="btn-primary flex-1 text-center py-3">
          Changer le mot de passe
        </a>
        <a href="/settings" className="flex-1 text-center py-3 border border-border rounded-lg hover:bg-muted transition-colors">
          Paramètres
        </a>
      </div>
    </div>
  );
};

export default Profile;
