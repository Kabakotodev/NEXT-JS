// Users.jsx
import { useEffect, useState } from "react";
import { Search, Plus, Trash2, Users } from "lucide-react";
import { notifySuccess, notifyError, notifyWarning } from "../utils/toast";
import { api } from "@/services/api";

const API_USERS = "http://localhost:4000/api/admin/users";
const API_ROLES = "http://localhost:4000/api/admin/roles";
const API_SERVICES = "http://localhost:4000/api/admin/services";

interface Role {
  id: number;
  nom_role: string;
}

interface Service {
  id: number;
  nom_service: string;
}

interface User {
  id: number;
  prenom: string;
  nom: string;
  username: string;
  contact: string;
  actif: boolean;
  role?: Role;
  service?: Service;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState<any>({
    prenom: "",
    nom: "",
    contact: "",
    username: "",
    password: "",
    confirmPassword: "",
    roleId: "",
    serviceId: "",
    actif: true,
  });

  /* ================= LOAD DATA ================= */

  const loadAll = async () => {
    try {
      const [u, r, s] = await Promise.all([
        // fetch(API_USERS).then(res => res.json()),
        api("/api/admin/users").then(res => res.json()),
      
        
        fetch(API_ROLES).then(res => res.json()),
        fetch(API_SERVICES).then(res => res.json()),
      ]);

      setUsers(u);
      setFilteredUsers(u);
      setRoles(r);
      setServices(s);
    } catch {
      notifyError("Erreur chargement données");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredUsers(
        users.filter(u =>
          Object.values(u)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  /* ================= VALIDATION ================= */

  const validateForm = () => {
    const {
      prenom,
      nom,
      contact,
      username,
      password,
      confirmPassword,
      roleId,
      serviceId,
    } = formData;

    if (
      !prenom ||
      !nom ||
      !contact ||
      !username ||
      !password ||
      !confirmPassword ||
      !roleId ||
      !serviceId
    ) {
      notifyWarning("Tous les champs sont obligatoires");
      return false;
    }

    if (password !== confirmPassword) {
      notifyError("Les mots de passe ne correspondent pas");
      return false;
    }

    if (password.length < 6) {
      notifyWarning("Mot de passe minimum 6 caractères");
      return false;
    }

    return true;
  };

  /* ================= CREATE ================= */

  const createUser = async () => {
    if (!validateForm()) return;

    await api("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prenom: formData.prenom,
        nom: formData.nom,
        contact: formData.contact,
        username: formData.username,
        password: formData.password,
        roleId: Number(formData.roleId),
        serviceId: Number(formData.serviceId),
        actif: true,
      }),
    });

    notifySuccess("Utilisateur créé avec succès");
    loadAll();
  };

  const deleteUser = async (id: number) => {
    await fetch(API_USERS, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    notifySuccess("Utilisateur supprimé");
    loadAll();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser();
    setShowModal(false);
  };

  /* ================= JSX ================= */

  return (
    <div className="space-y-6 animate-fade-in">

      <div className="page-header">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion des Utilisateurs</h1>
        </div>

        <button
          className="btn-primary flex gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Username</th>
              <th>Service</th>
              <th>Rôle</th>
              <th>Actif</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.prenom} {user.nom}</td>
                <td>{user.username}</td>
                <td>{user.service?.nom_service || "-"}</td>
                <td>
                  <span className="badge badge-primary">
                    {user.role?.nom_role || "-"}
                  </span>
                </td>
                <td>{user.actif ? "✅" : "❌"}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-2xl">
            <h2 className="text-xl mb-4">Nouvel Utilisateur</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

              <input className="form-input" placeholder="Prénom *"
                value={formData.prenom}
                onChange={e => setFormData({...formData, prenom: e.target.value})} />

              <input className="form-input" placeholder="Nom *"
                value={formData.nom}
                onChange={e => setFormData({...formData, nom: e.target.value})} />

              <input className="form-input" placeholder="Contact *"
                value={formData.contact}
                onChange={e => setFormData({...formData, contact: e.target.value})} />

              <input className="form-input" placeholder="Username *"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})} />

              <input type="password" className="form-input"
                placeholder="Mot de passe *"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})} />

              <input type="password" className="form-input"
                placeholder="Confirmation mot de passe *"
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />

              <select className="form-select"
                value={formData.roleId}
                onChange={e => setFormData({...formData, roleId: e.target.value})}>
                <option value="">-- Sélectionner Rôle * --</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.nom_role}
                  </option>
                ))}
              </select>

              <select className="form-select"
                value={formData.serviceId}
                onChange={e => setFormData({...formData, serviceId: e.target.value})}>
                <option value="">-- Sélectionner Service * --</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.nom_service}
                  </option>
                ))}
              </select>

              <div className="col-span-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Créer
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
