import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, Shield } from 'lucide-react';
import { notifySuccess, notifyError, notifyWarning } from '../utils/toast';

const API_URL = 'http://localhost:8085/api/roles';

interface Role {
  id: number;
  nomRole: string;
  descRole: string;
}

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [formData, setFormData] = useState({
    nomRole: '',
    descRole: '',
  });

  /* ===================== API ===================== */

  // ⚠️ AUCUN toast ici (chargement initial)
  const loadRoles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRoles(data);
      setFilteredRoles(data);
    } catch {
      // volontairement silencieux
    }
  };

  const createRole = async () => {
    try {
      if (!formData.nomRole.trim()) {
        notifyWarning('⚠️ Le nom du rôle est obligatoire');
        return;
      }

      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      notifySuccess('✅ Rôle créé avec succès');
      loadRoles();
    } catch {
      notifyError('❌ Échec de la création du rôle');
    }
  };

  const updateRole = async () => {
    if (!editingRole) return;

    try {
      await fetch(`${API_URL}/${editingRole.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      notifySuccess('✏️ Rôle modifié avec succès');
      loadRoles();
    } catch {
      notifyError('❌ Échec de la modification du rôle');
    }
  };

  const deleteRole = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      notifySuccess('🗑️ Rôle supprimé');
      loadRoles();
    } catch {
      notifyError('❌ Suppression impossible');
    }
  };

  /* ===================== EFFECTS ===================== */

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredRoles(
        roles.filter(r =>
          Object.values(r)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredRoles(roles);
    }
    setCurrentPage(1);
  }, [searchTerm, roles]);

  /* ===================== PAGINATION ===================== */

  const paginatedData = filteredRoles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

  /* ===================== HANDLERS ===================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    editingRole ? await updateRole() : await createRole();
    setShowModal(false);
    setEditingRole(null);
    setFormData({ nomRole: '', descRole: '' });
  };

  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === paginatedData.length
        ? []
        : paginatedData.map(r => r.id)
    );
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Supprimer ${selectedItems.length} rôle(s) ?`)) return;

    try {
      await Promise.all(selectedItems.map(id => deleteRole(id)));
      setSelectedItems([]);
      notifySuccess(`🗑️ ${selectedItems.length} rôle(s) supprimé(s)`);
    } catch {
      notifyError('❌ Erreur lors de la suppression multiple');
    }
  };

  /* ===================== JSX ===================== */

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion des Rôles</h1>
          <span className="badge badge-primary">
            {filteredRoles.length} rôle(s)
          </span>
        </div>

        <div className="flex gap-3">
          {selectedItems.length > 0 && (
            <button onClick={handleDeleteSelected} className="btn-danger flex gap-2">
              <Trash2 className="w-4 h-4" />
              Supprimer ({selectedItems.length})
            </button>
          )}
          <button
            className="btn-primary flex gap-2"
            onClick={() => {
              setEditingRole(null);
              setFormData({ nomRole: '', descRole: '' });
              setShowModal(true);
            }}
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-card p-4 rounded-xl border">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          <input
            className="search-input pl-10"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={toggleSelectAll} />
              </th>
              <th>ID</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(role => (
              <tr key={role.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(role.id)}
                    onChange={() =>
                      setSelectedItems(p =>
                        p.includes(role.id)
                          ? p.filter(i => i !== role.id)
                          : [...p, role.id]
                      )
                    }
                  />
                </td>
                <td>{role.id}</td>
                <td>
                  <span className="badge badge-primary">{role.nomRole}</span>
                </td>
                <td>{role.descRole}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingRole(role);
                      setFormData(role);
                      setShowModal(true);
                    }}
                  >
                    <Edit className="w-4 h-4 text-yellow-600" />
                  </button>
                  <button onClick={() => deleteRole(role.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination (inchangée, comme l’original) */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-white rounded-b-xl">
          <div className="flex items-center gap-2">
            <span>Afficher</span>
            <select
              value={itemsPerPage}
              onChange={e => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Précédent
            </button>
            <span>{currentPage} / {totalPages || 1}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl mb-4">
              {editingRole ? 'Modifier Rôle' : 'Nouveau Rôle'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="form-input"
                placeholder="Nom du rôle"
                value={formData.nomRole}
                onChange={e => setFormData({ ...formData, nomRole: e.target.value })}
                required
              />
              <textarea
                className="form-input"
                placeholder="Description"
                value={formData.descRole}
                onChange={e => setFormData({ ...formData, descRole: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingRole ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
