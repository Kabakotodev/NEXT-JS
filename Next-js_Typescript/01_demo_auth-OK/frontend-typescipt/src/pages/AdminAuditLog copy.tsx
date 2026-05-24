import { useEffect, useState } from "react";
import { Shield, Activity } from "lucide-react";
import { api } from "../services/api";
import { notifyError } from "../utils/toast";
import { useAuth } from "../context/AuthContext";

interface AuditLog {
  id: number;
  action: string;
  username?: string;
  ipAddress?: string;
  createdAt: string;
}

const AdminAuditLog = () => {
  const { user } = useAuth();

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      setLoading(true);

      const response = await api("/api/admin/audit");

      if (!response.ok) {
        notifyError("Accès refusé ou session expirée");
        return;
      }

      const data = await response.json();

      setLogs(data);
      setFilteredLogs(data);

    } catch (error) {
      notifyError("Erreur chargement audit");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 🔒 Protection supplémentaire frontend
    if (user?.role !== "ADMIN") {
      notifyError("Accès réservé aux administrateurs");
      return;
    }

    loadLogs();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredLogs(
        logs.filter(log =>
          log.action.toLowerCase().includes(filter.toLowerCase()) ||
          log.username?.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredLogs(logs);
    }
  }, [filter, logs]);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* HEADER */}
      <div className="page-header flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <h1 className="page-title">Audit & Historique</h1>
        <span className="badge badge-primary">
          {filteredLogs.length} événement(s)
        </span>
      </div>

      {/* FILTRE */}
      <div className="bg-card p-4 rounded-xl border">
        <input
          type="text"
          placeholder="Filtrer par action ou username"
          className="form-input"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl border overflow-hidden">

        {loading ? (
          <div className="p-6 text-center text-muted-foreground">
            Chargement des logs...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            Aucun événement trouvé
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Action</th>
                <th>Username</th>
                <th>IP</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>
                    <span className="badge badge-primary">
                      {log.action}
                    </span>
                  </td>
                  <td>{log.username || "-"}</td>
                  <td>{log.ipAddress || "-"}</td>
                  <td>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default AdminAuditLog;
