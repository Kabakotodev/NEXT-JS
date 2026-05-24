import { useState, useEffect } from "react";
import {
  Search,
  Key,
  UserCheck,
  UserX,
  Users,
  Clock,
  Eye,
  EyeOff,
  QrCode
} from "lucide-react";
// import QRCode from "qrcode.react";
import { QrCode as QrIcon } from "lucide-react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";


const API_BASE = "http://localhost:4000";

// interface User {
//   id: number;
//   prenom: string;
//   nom: string;
//   username: string;
//   role: string;  // ✅ STRING
//   actif: boolean;
//   last_login: string;
// }

// interface User {
//   id: number;
//   prenom: string;
//   nom: string;
//   contact?: string;
//   username: string;
//   role: string;
//   roleId?: number;
//   serviceId?: number;
//   service?: string;
//   actif: boolean;
//   last_login?: string;
// }

interface User {
  id: number;
  prenom: string;
  nom: string;
  contact?: string;
  username: string;

  role: string;
  roleId?: number;

  service?: string;
  serviceId?: number;

  actif: boolean;
  last_login: string;
}


const AdminGestionUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // EDIT DATA USER
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  // DEATAIL USER
  // const [showDetailModal, setShowDetailModal] = useState(false);
  // const [detailUser, setDetailUser] = useState<User | null>(null);
  const navigate = useNavigate();

  /* ================= LOAD USERS ================= */

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await response.json();

      if (!response.ok) return;

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Erreur chargement users");
    }
  };

  // LOAD ROLES AND SERVICES
  useEffect(() => {
  loadRolesAndServices();
    }, []);

    const loadRolesAndServices = async () => {
      try {
        const [rolesRes, servicesRes] = await Promise.all([
          fetch(`${API_BASE}/api/admin/roles`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }),
          fetch(`${API_BASE}/api/admin/services`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
        ]);

        setRoles(await rolesRes.json());
        setServices(await servicesRes.json());

      } catch (error) {
        console.error("Erreur chargement roles/services");
      }
    };


  /* ================= SEARCH ================= */

  useEffect(() => {
    if (searchTerm) {
      const result = users.filter(u =>
        Object.values(u)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(result);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  /* ================= PASSWORD CHANGE ================= */

  const handleChangePassword = async () => {
    if (!selectedUser) return;

    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 6) {
      alert("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/api/admin/change-user-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            userId: selectedUser.id,
            newPassword
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erreur");
        return;
      }

      alert("Mot de passe modifié avec succès");

      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setSelectedUser(null);

    } catch (error) {
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

    const handleToggleClick = (user: User) => {
    if (user.actif) {
      const confirmed = window.confirm(
        `⚠️ Voulez-vous vraiment désactiver ${user.username} ?\n\nIl sera immédiatement déconnecté.`
      );

      if (!confirmed) return;
    }
    toggleUserStatus(user.id);
  };

  const toggleUserStatus = async (userId: number) => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/users/toggle-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ userId })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

    setUsers(users.map(u =>
      u.id === userId ? { ...u, actif: data.actif } : u
    ));

  } catch (error) {
    alert("Erreur serveur");
  }

 
  // FONCTION OUVERTURE MODAL EDIT USER
//   const handleEditClick = (user: User) => {

//   setEditForm({
//     id: user.id,
//     prenom: user.prenom,
//     nom: user.nom,
//     contact: user.contact || "",
//     username: user.username,
//     roleId: user.roleId || "",
//     serviceId: user.serviceId || ""
//   });

//   setShowEditModal(true);
// };


  // FONCTION UPDATE USER
  const handleUpdateUser = async () => {

  if (!editForm.prenom || !editForm.nom || !editForm.username) {
    alert("Veuillez remplir tous les champs obligatoires");
    return;
  }

  try {

    setLoading(true);

    const response = await fetch(
      `${API_BASE}/api/admin/users/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          id: editForm.id,
          prenom: editForm.prenom,
          nom: editForm.nom,
          contact: editForm.contact,
          username: editForm.username,
          roleId: editForm.roleId ? Number(editForm.roleId) : null,
          serviceId: editForm.serviceId ? Number(editForm.serviceId) : null
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Erreur lors de la mise à jour");
      return;
    }

    // 🔥 Reload tableau
    await loadUsers();

    setShowEditModal(false);
    setEditForm(null);

    alert("Utilisateur modifié avec succès");

  } catch (error) {
    alert("Erreur serveur");
  } finally {
    setLoading(false);
  }
};
};


  /* ================= PAGINATION ================= */

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  //
  const handleEditClick = (user: User) => {
    setEditForm({
      id: user.id,
      prenom: user.prenom,
      nom: user.nom,
      contact: user.contact || "",
      username: user.username,
      roleId: user.roleId || "",
      serviceId: user.serviceId || ""
    });

    setShowEditModal(true);
  };

  //
   /* ================= DETAIL ================= */

 const handleDetailClick = (user: User) => {
  navigate(`/admin/users/${user.id}`);
};


  //
  const handleUpdateUser = async () => {

    if (!editForm.prenom || !editForm.nom || !editForm.username) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${API_BASE}/api/admin/users/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            id: editForm.id,
            prenom: editForm.prenom,
            nom: editForm.nom,
            contact: editForm.contact,
            username: editForm.username,
            roleId: editForm.roleId ? Number(editForm.roleId) : null,
            serviceId: editForm.serviceId ? Number(editForm.serviceId) : null
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erreur lors de la mise à jour");
        return;
      }

      // 🔥 Reload tableau
      await loadUsers();

      setShowEditModal(false);
      setEditForm(null);

      alert("Utilisateur modifié avec succès");

    } catch (error) {
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };



  /* ================= RENDER ================= */

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header flex items-center gap-3">
        <Users className="w-8 h-8 text-primary" />
        <h1 className="page-title">XXX Gestion Utilisateurs (Admin)</h1>
        <span className="badge badge-primary text-sm px-3 py-1">
          {filteredUsers.length} utilisateur(s)
        </span>
      </div>

      {/* SEARCH */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input pl-10"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom complet</th>
              <th>Username</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.prenom} {user.nom}</td>
                <td>{user.username}</td>
                <td>
                  <span className="badge badge-primary">
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.actif ? "badge-success" : "badge-danger"}`}>
                    {user.actif ? "Actif" : "Inactif"}
                  </span>
                </td>
                  <td className="flex gap-2">
                    {/* EDIT DATA USER */}
                    <button
                      onClick={() => handleEditClick(user)}
                      className="btn-warning text-xs px-3 py-1"
                    >
                      Editer
                    </button>

                    {/* PASSWORD */}
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowPasswordModal(true);
                      }}
                      className="btn-primary text-xs px-3 py-1 flex items-center gap-1"
                    >
                      <Key className="w-3 h-3" />
                      Password
                    </button>

                    {/* ACTIVER / DESACTIVER */}
                    <button
                      onClick={() => handleToggleClick(user)}
                      className={`text-xs px-3 py-1 rounded-lg ${
                        user.actif ? "btn-danger" : "btn-success"
                      }`}
                    >
                      {user.actif ? "Désactiver" : "Activer"}
                    </button>

                    {/* <button
                      onClick={() => handleDetailClick(user)}
                      className="btn-secondary text-xs px-3 py-1"
                    >
                      Detail
                    </button> */}
                    <button
                      onClick={() => handleDetailClick(user)}
                      className="btn-info text-xs px-3 py-1"
                    >
                      Detail
                    </button>

                  </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div>
            Page {currentPage} / {totalPages || 1}
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Précédent
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">
              Changer mot de passe
            </h2>

            <div className="space-y-4">

              <div>
                <label className="form-label">Username</label>
                <input
                  className="form-input bg-muted"
                  value={selectedUser.username}
                  readOnly
                />
              </div>

              <div>
                <label className="form-label">Nouveau mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input pr-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              <div>
                <label className="form-label">Confirmer</label>
                <input
                  type="password"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowPasswordModal(false)}>
                  Annuler
                </button>
                <button
                  onClick={handleChangePassword}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Modification..." : "Changer"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && editForm && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div
            className="modal-content max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              Modifier utilisateur
            </h2>

            <div className="space-y-4">

              <input
                className="form-input"
                placeholder="Prénom"
                value={editForm.prenom}
                onChange={(e) =>
                  setEditForm({ ...editForm, prenom: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Nom"
                value={editForm.nom}
                onChange={(e) =>
                  setEditForm({ ...editForm, nom: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Contact"
                value={editForm.contact}
                onChange={(e) =>
                  setEditForm({ ...editForm, contact: e.target.value })
                }
              />

              <input
                className="form-input"
                placeholder="Username"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
              />

              <select
                className="form-select"
                value={editForm.roleId}
                onChange={(e) =>
                  setEditForm({ ...editForm, roleId: Number(e.target.value) })
                }
              >
                <option value="">Sélectionner rôle</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nom_role}
                  </option>
                ))}
              </select>

              <select
                className="form-select"
                value={editForm.serviceId}
                onChange={(e) =>
                  setEditForm({ ...editForm, serviceId: Number(e.target.value) })
                }
              >
                <option value="">Sélectionner service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nom_service}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowEditModal(false)}>
                  Annuler
                </button>
                <button
                  onClick={handleUpdateUser}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Modification..." : "Enregistrer"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default AdminGestionUsers;
