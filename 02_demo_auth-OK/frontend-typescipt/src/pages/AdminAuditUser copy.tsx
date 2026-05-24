import { useState, useEffect } from 'react';
import { Search, Eye, History, Clock, User } from 'lucide-react';

interface AuditLog {
  id: number;
  userId: number;
  username: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

interface ConnectedUser {
  id: number;
  prenom: string;
  nom: string;
  username: string;
  loginTime: string;
  ipAddress: string;
}

const AdminAuditUser = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'logs' | 'connected'>('logs');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const mockLogs: AuditLog[] = [
      { id: 1, userId: 1, username: 'jdupont', action: 'LOGIN', details: 'Connexion réussie', ipAddress: '192.168.1.100', timestamp: '2024-01-15 10:30:00' },
      { id: 2, userId: 1, username: 'jdupont', action: 'CREATE', details: 'Création flux ID:45', ipAddress: '192.168.1.100', timestamp: '2024-01-15 10:35:00' },
      { id: 3, userId: 2, username: 'mmartin', action: 'LOGIN', details: 'Connexion réussie', ipAddress: '192.168.1.101', timestamp: '2024-01-15 09:15:00' },
      { id: 4, userId: 2, username: 'mmartin', action: 'UPDATE', details: 'Modification vol AF1234', ipAddress: '192.168.1.101', timestamp: '2024-01-15 09:45:00' },
      { id: 5, userId: 3, username: 'pbernard', action: 'LOGIN_FAILED', details: 'Tentative de connexion échouée', ipAddress: '192.168.1.102', timestamp: '2024-01-14 14:20:00' },
      { id: 6, userId: 1, username: 'jdupont', action: 'DELETE', details: 'Suppression compagnie ID:3', ipAddress: '192.168.1.100', timestamp: '2024-01-15 11:00:00' },
      { id: 7, userId: 2, username: 'mmartin', action: 'LOGOUT', details: 'Déconnexion', ipAddress: '192.168.1.101', timestamp: '2024-01-15 12:00:00' },
    ];
    setAuditLogs(mockLogs);
    setFilteredLogs(mockLogs);

    const mockConnected: ConnectedUser[] = [
      { id: 1, prenom: 'Jean', nom: 'Dupont', username: 'jdupont', loginTime: '2024-01-15 10:30:00', ipAddress: '192.168.1.100' },
      { id: 2, prenom: 'Marie', nom: 'Martin', username: 'mmartin', loginTime: '2024-01-15 09:15:00', ipAddress: '192.168.1.101' },
    ];
    setConnectedUsers(mockConnected);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const result = auditLogs.filter(log => 
        Object.values(log).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredLogs(result);
    } else {
      setFilteredLogs(auditLogs);
    }
    setCurrentPage(1);
  }, [searchTerm, auditLogs]);

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  const getActionBadge = (action: string) => {
    const badges: Record<string, string> = {
      'LOGIN': 'badge-success',
      'LOGOUT': 'badge-primary',
      'CREATE': 'bg-green-100 text-green-800',
      'UPDATE': 'badge-warning',
      'DELETE': 'badge-danger',
      'LOGIN_FAILED': 'bg-red-100 text-red-800',
    };
    return badges[action] || 'badge-primary';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <History className="w-8 h-8 text-primary" />
          <h1 className="page-title">Audit & Historique</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'logs' 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          <History className="w-4 h-4 inline mr-2" />
          Historique des actions
        </button>
        <button
          onClick={() => setActiveTab('connected')}
          className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
            activeTab === 'connected' 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          <User className="w-4 h-4 inline mr-2" />
          Utilisateurs connectés
          <span className="ml-2 px-2 py-0.5 bg-green-500 text-white rounded-full text-xs">
            {connectedUsers.length}
          </span>
        </button>
      </div>

      {activeTab === 'logs' && (
        <>
          {/* Search */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher dans l'historique..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input pl-10"
                />
              </div>
              <span className="badge badge-primary text-sm px-3 py-1">
                {filteredLogs.length} enregistrement(s)
              </span>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Utilisateur</th>
                    <th>Action</th>
                    <th>Détails</th>
                    <th>Adresse IP</th>
                    <th>Date/Heure</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td className="font-medium">{log.username}</td>
                      <td>
                        <span className={`badge ${getActionBadge(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td>{log.details}</td>
                      <td><code className="text-xs bg-muted px-2 py-1 rounded">{log.ipAddress}</code></td>
                      <td>{log.timestamp}</td>
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
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border border-border disabled:opacity-50"
                >
                  Précédent
                </button>
                <span className="text-sm">{currentPage} / {totalPages}</span>
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
        </>
      )}

      {activeTab === 'connected' && (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-heading font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              Utilisateurs actuellement connectés
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom complet</th>
                  <th>Username</th>
                  <th>Heure de connexion</th>
                  <th>Adresse IP</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {connectedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td className="font-medium">{user.prenom} {user.nom}</td>
                    <td>{user.username}</td>
                    <td>{user.loginTime}</td>
                    <td><code className="text-xs bg-muted px-2 py-1 rounded">{user.ipAddress}</code></td>
                    <td>
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-600 text-sm">En ligne</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAuditUser;
