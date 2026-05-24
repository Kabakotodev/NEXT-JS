import { useState, useEffect } from "react";
import { Search, Key, UserCheck, UserX, Users, Clock } from "lucide-react";
import { api } from "../services/api";

interface User {
  id: number;
  prenom: string;
  nom: string;
  username: string;
  role: string;
  actif: boolean;
  last_login?: string;
  isOnline?: boolean;
}

const AdminGestionUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  /* ================= LOAD USERS ================= */

  const loadUsers = async () => {
    try {
      const response = await api("/api/admin/users");
      const data = await response.json();

      const formatted = data.map((u: any) => ({
        id: u.id,
        prenom: u.prenom,
        nom: u.nom,
        username: u.username,
        role: u.role?.nom_role || "N/A",
        actif: u.actif,
        last_login: u.last_login,
      }));

      setUsers(formatted);
      setFilteredUsers(formatted);
    } catch (err) {
      console.error("Erreur chargement users", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ================= SEARCH ================= */

  useEffect(() => {
    if (searchTerm) {
      const result = users.filter((u) =>
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

  /* ================= PAGINATION ================= */

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  /* ================= ACTIVER / DESACTIVER ================= */

  const toggleUserStatus = async (user: User) => {
    try {
      await api(`/api/admin/users/${user.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ actif: !user.actif }),
      });

      loadUsers();
    } catch (err) {
      console.error("Erreur statut", err);
    }
  };

  /* ================= DELETE ================= */

  const deleteUser = async (id: number) => {
    if (!confirm("Confirmer suppression ?")) return;

    try {
      await api(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      loadUsers();
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  /* ================= CHANGE PASSWORD ================= */

  const handleChangePassword = async () => {
    if (!selectedUser) return;

    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 6) {
      alert("Minimum 6 caractères");
      return;
    }

    try {
      await api(`/api/admin/users/${selectedUser.id}/password`, {
        method: "PATCH",
        body: JSON.stringify({ newPassword }),
      });

      alert("Mot de passe modifié");
      setShowPasswordModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setSelectedUser(null);

    } catch (err) {
      console.error("Erreur password", err);
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6 animate-fade-in">

      <div className="page-header">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion Utilisateurs (Admin)</h1>
          <span className="badge badge-primary">
            {filteredUsers.length} utilisateur(s)
          </span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-card rounded-xl border p-4">
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
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Username</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Dernière connexion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.prenom} {user.nom}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`badge ${user.actif ? "badge-success" : "badge-danger"}`}>
                      {user.actif ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td>{user.last_login || "-"}</td>
                  <td>
                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowPasswordModal(true);
                        }}
                        className="btn-primary text-xs px-3 py-1"
                      >
                        <Key size={14} /> Password
                      </button>

                      <button
                        onClick={() => toggleUserStatus(user)}
                        className={`text-xs px-3 py-1 rounded ${
                          user.actif ? "btn-danger" : "btn-success"
                        }`}
                      >
                        {user.actif ? "Désactiver" : "Activer"}
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn-danger text-xs px-3 py-1"
                      >
                        Supprimer
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between px-4 py-3 border-t">
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
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl mb-4">Changer le mot de passe</h2>

            <input
              className="form-input mb-3 bg-gray-100"
              value={selectedUser.username}
              readOnly
            />

            <input
              type="password"
              className="form-input mb-3"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              className="form-input mb-3"
              placeholder="Confirmer"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowPasswordModal(false)}>
                Annuler
              </button>
              <button onClick={handleChangePassword} className="btn-primary">
                Valider
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminGestionUsers;
