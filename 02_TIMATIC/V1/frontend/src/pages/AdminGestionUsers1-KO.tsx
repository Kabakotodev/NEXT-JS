import { useState, useEffect } from "react";
import { Search, Key, UserCheck, UserX, Users, Clock, Trash2 } from "lucide-react";
import api from "@/utils/axios";

interface User {
  id: number;
  prenom: string;
  nom: string;
  username: string;
  role: { nomRole: string };
  active: boolean;
  lastLogin?: string;
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

  // 🔥 Charger depuis backend
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
    setFilteredUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔎 Recherche
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

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // 🔄 Activer / Désactiver
  const toggleUserStatus = async (userId: number, active: boolean) => {
    await api.put(`/users/${active ? "deactivate" : "activate"}/${userId}`);
    fetchUsers();
  };

  // 🗑 Supprimer
  const deleteUser = async (id: number) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  // 🔐 Reset Password
  const handleChangePassword = async () => {
    if (!selectedUser) return;

    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    await api.put(`/users/reset-password/${selectedUser.id}`, {
      newPassword,
    });

    alert("Mot de passe modifié");
    setShowPasswordModal(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="page-header flex items-center gap-3">
        <Users className="w-8 h-8 text-primary" />
        <h1 className="page-title">Gestion Utilisateurs (Admin)</h1>
        <span className="badge badge-primary px-3 py-1">
          {filteredUsers.length} utilisateur(s)
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<UserCheck className="w-5 h-5 text-green-600" />}
          label="Actifs"
          value={users.filter((u) => u.active).length}
          color="green"
        />
        <StatCard
          icon={<UserX className="w-5 h-5 text-red-600" />}
          label="Inactifs"
          value={users.filter((u) => !u.active).length}
          color="red"
        />
        <StatCard
          icon={<Clock className="w-5 h-5 text-blue-600" />}
          label="Total"
          value={users.length}
          color="blue"
        />
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
                    <span className={`badge ${
                      user.role.nomRole === "ADMIN"
                        ? "badge-danger"
                        : "badge-primary"
                    }`}>
                      {user.role.nomRole}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      user.active ? "badge-success" : "badge-danger"
                    }`}>
                      {user.active ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowPasswordModal(true);
                        }}
                        className="btn-primary text-xs px-3 py-1 flex items-center gap-1"
                      >
                        <Key className="w-3 h-3" /> Password
                      </button>

                      <button
                        onClick={() =>
                          toggleUserStatus(user.id, user.active)
                        }
                        className={`text-xs px-3 py-1 rounded-lg flex items-center gap-1 ${
                          user.active ? "btn-danger" : "btn-success"
                        }`}
                      >
                        {user.active ? (
                          <UserX className="w-3 h-3" />
                        ) : (
                          <UserCheck className="w-3 h-3" />
                        )}
                        {user.active ? "Désactiver" : "Activer"}
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn-danger text-xs px-3 py-1 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Supprimer
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
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* MODAL PASSWORD */}
      {showPasswordModal && selectedUser && (
        <PasswordModal
          user={selectedUser}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          onClose={() => setShowPasswordModal(false)}
          onSubmit={handleChangePassword}
        />
      )}
    </div>
  );
};

//
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const StatCard = ({ icon, label, value }: StatCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

//
interface PasswordModalProps {
  user: User;
  newPassword: string;
  confirmPassword: string;
  setNewPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const PasswordModal = ({
  user,
  newPassword,
  confirmPassword,
  setNewPassword,
  setConfirmPassword,
  onClose,
  onSubmit,
}: PasswordModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">
          Changer le mot de passe
        </h2>

        <div className="space-y-4">
          <div>
            <label className="form-label">Utilisateur</label>
            <input
              type="text"
              className="form-input bg-muted"
              value={user.username}
              readOnly
            />
          </div>

          <div>
            <label className="form-label">Nouveau mot de passe</label>
            <input
              type="password"
              className="form-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-lg"
            >
              Annuler
            </button>

            <button
              onClick={onSubmit}
              className="btn-primary"
            >
              Changer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGestionUsers;