import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Users as UsersIcon } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface User {
  id: number;
  prenom: string;
  nom: string;
  contact: string;
  service_id: number;
  service?: { nom_service: string };
  role: string;
  username: string;
  actif: boolean;
  last_login?: string;
}

const GestionUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [actifFilter, setActifFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  // Mock data for demo
  useEffect(() => {
    const mockUsers: User[] = [
      { id: 1, prenom: 'Jean', nom: 'Dupont', contact: '+221 77 123 4567', service_id: 1, service: { nom_service: 'Immigration' }, role: 'ADMIN', username: 'jdupont', actif: true, last_login: '2024-01-15 10:30' },
      { id: 2, prenom: 'Marie', nom: 'Martin', contact: '+221 78 234 5678', service_id: 2, service: { nom_service: 'Police des Frontières' }, role: 'USER', username: 'mmartin', actif: true, last_login: '2024-01-15 09:15' },
      { id: 3, prenom: 'Pierre', nom: 'Bernard', contact: '+221 76 345 6789', service_id: 1, service: { nom_service: 'Immigration' }, role: 'USER', username: 'pbernard', actif: false, last_login: '2024-01-10 14:20' },
      { id: 4, prenom: 'Sophie', nom: 'Leclerc', contact: '+221 77 456 7890', service_id: 3, service: { nom_service: 'Douanes' }, role: 'AUTRE', username: 'sleclerc', actif: true, last_login: '2024-01-14 16:45' },
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    
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

  useEffect(() => {
    let result = users;

    if (searchTerm) {
      result = result.filter(user => 
        Object.values(user).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (roleFilter) {
      result = result.filter(user => user.role === roleFilter);
    }

    if (serviceFilter) {
      result = result.filter(user => user.service_id === parseInt(serviceFilter));
    }

    if (actifFilter !== '') {
      result = result.filter(user => user.actif === (actifFilter === 'true'));
    }

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [searchTerm, roleFilter, serviceFilter, actifFilter, users]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <UsersIcon className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion des Utilisateurs</h1>
          <span className="badge badge-primary text-sm px-3 py-1">
            {filteredUsers.length} utilisateur(s)
          </span>
        </div>
        <button 
          onClick={() => { setEditingUser(null); setShowModal(true); }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      {/* Search filters */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
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
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="form-select"
          >
            <option value="">Tous les rôles</option>
            {roles.map(role => (
              <option key={role.id} value={role.nom_role}>{role.nom_role}</option>
            ))}
          </select>
          <select 
            value={serviceFilter} 
            onChange={(e) => setServiceFilter(e.target.value)}
            className="form-select"
          >
            <option value="">Tous les services</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.nom_service}</option>
            ))}
          </select>
          <select 
            value={actifFilter} 
            onChange={(e) => setActifFilter(e.target.value)}
            className="form-select"
          >
            <option value="">Tous les statuts</option>
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Rôle</th>
                <th>Username</th>
                <th>Statut</th>
                <th>Dernière connexion</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.prenom}</td>
                  <td>{user.nom}</td>
                  <td>{user.contact}</td>
                  <td>{user.service?.nom_service}</td>
                  <td>
                    <span className={`badge ${
                      user.role === 'ADMIN' ? 'badge-danger' : 
                      user.role === 'USER' ? 'badge-primary' : 'badge-warning'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.username}</td>
                  <td>
                    <span className={`badge ${user.actif ? 'badge-success' : 'badge-danger'}`}>
                      {user.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td>{user.last_login}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-muted rounded-lg text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setEditingUser(user); setShowModal(true); }}
                        className="p-1.5 hover:bg-muted rounded-lg text-yellow-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 hover:bg-muted rounded-lg text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Afficher</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="form-select w-20"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-muted-foreground">par page</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-border disabled:opacity-50"
            >
              Précédent
            </button>
            <span className="text-sm">
              Page {currentPage} sur {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-border disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content max-w-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-heading font-semibold mb-4">
              {editingUser ? 'Modifier Utilisateur' : 'Nouvel Utilisateur'}
            </h2>
            <form className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Prénom</label>
                <input type="text" className="form-input" defaultValue={editingUser?.prenom} />
              </div>
              <div>
                <label className="form-label">Nom</label>
                <input type="text" className="form-input" defaultValue={editingUser?.nom} />
              </div>
              <div>
                <label className="form-label">Contact</label>
                <input type="text" className="form-input" defaultValue={editingUser?.contact} />
              </div>
              <div>
                <label className="form-label">Service</label>
                <select className="form-select" defaultValue={editingUser?.service_id}>
                  <option value="">Sélectionner un service</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.nom_service}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Rôle</label>
                <select className="form-select" defaultValue={editingUser?.role}>
                  <option value="">Sélectionner un rôle</option>
                  {roles.map(r => (
                    <option key={r.id} value={r.nom_role}>{r.nom_role}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Username</label>
                <input type="text" className="form-input" defaultValue={editingUser?.username} />
              </div>
              <div className="col-span-2 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-border rounded-lg">
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingUser ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsers;
