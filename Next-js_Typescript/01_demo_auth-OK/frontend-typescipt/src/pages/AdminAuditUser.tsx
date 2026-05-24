import { useEffect, useState } from "react";
import { Shield, Activity } from "lucide-react";
import { api } from "../services/api";

interface AuditLog {
  id: number;
  action: string;
  username?: string;
  ipAddress?: string;
  createdAt: string;
}

const AdminAuditUser = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState("");

  const loadLogs = async () => {
    const response = await api("/api/admin/audit");
    const data = await response.json();
    setLogs(data);
    setFilteredLogs(data);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredLogs(
        logs.filter(log =>
          log.action.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredLogs(logs);
    }
  }, [filter, logs]);

  return (
    <div className="space-y-6 animate-fade-in">

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
          placeholder="Filtrer par action (LOGIN, LOGOUT...)"
          className="form-input"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl border overflow-hidden">
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
      </div>

    </div>
  );
};

export default AdminAuditUser;
