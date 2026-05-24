import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import QRCode from "react-qr-code";

const API_BASE = "http://localhost:4000";

interface UserDetail {
  id: number;
  prenom: string;
  nom: string;
  contact?: string;
  username: string;
  role?: string;
  service?: string;
}

const UserDetailCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      const data = await res.json();
      setUser(data);

    } catch (error) {
      console.error("Erreur chargement utilisateur");
    }
  };

  if (!user) {
    return <div className="p-6">Chargement...</div>;
  }

  const qrValue = JSON.stringify({
    prenom: user.prenom,
    nom: user.nom,
    contact: user.contact,
    username: user.username,
    role: user.role,
    service: user.service
  });

  const initials =
    user.prenom?.charAt(0).toUpperCase() +
    user.nom?.charAt(0).toUpperCase();

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <User className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Fiche Utilisateur
          </h1>
          <p className="text-muted-foreground">
            Informations détaillées
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* PROFILE CARD */}
        <div className="bg-card rounded-xl border border-border p-6 text-center">

          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-primary-foreground">
              {initials}
            </span>
          </div>

          <h2 className="text-xl font-bold text-foreground">
            {user.prenom} {user.nom}
          </h2>

          <p className="text-muted-foreground">
            {user.role}
          </p>

          <div className="mt-4 pt-4 border-t border-border flex flex-col items-center gap-3">

            <QRCode
              value={qrValue}
              size={120}
            />

            <p className="text-xs text-muted-foreground">
              Scanner pour lire les informations
            </p>

          </div>
        </div>

        {/* DETAILS */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Informations personnelles
            </h3>

            <button
              onClick={() => navigate(-1)}
              className="h-9 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
            >
              <Edit className="w-4 h-4" />
              Retour
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nom complet</p>
                <p className="text-foreground font-medium">
                  {user.prenom} {user.nom}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="text-foreground font-medium">
                  {user.username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="text-foreground font-medium">
                  {user.contact || "Non renseigné"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Service</p>
                <p className="text-foreground font-medium">
                  {user.service || "Non défini"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rôle</p>
                <p className="text-foreground font-medium">
                  {user.role}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
