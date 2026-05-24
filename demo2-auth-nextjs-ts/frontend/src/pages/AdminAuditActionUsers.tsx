import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000";

interface Log {
  id: number;
  action: string;
  description?: string;
  createdAt: string;
  performedBy: { username: string };
  targetUser?: { username: string };
}

const AdminAuditActionUsers = () => {

  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const loadLogs = async () => {
    const res = await fetch(`${API_BASE}/api/admin/audit-user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await res.json();
    if (res.ok) setLogs(data);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const deleteLogs = async () => {

    if (selectedIds.length === 0) {
      alert("Sélectionnez au moins un log");
      return;
    }

    const confirmed = window.confirm(
      `Supprimer ${selectedIds.length} log(s) ?`
    );

    if (!confirmed) return;

    const res = await fetch(
      `${API_BASE}/api/admin/audit-user/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ logIds: selectedIds })
      }
    );

    if (res.ok) {
      setSelectedIds([]);
      loadLogs();
    }
  };

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">
        Audit Actions Utilisateurs
      </h2>

      <button
        onClick={deleteLogs}
        className="btn-danger px-4 py-2"
      >
        Supprimer sélection
      </button>

      <table className="data-table w-full mt-4">
        <thead>
          <tr>
            <th></th>
            <th>Action</th>
            <th>Effectué par</th>
            <th>Cible</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(log.id)}
                  onChange={() => toggleSelect(log.id)}
                />
              </td>
              <td>{log.action}</td>
              <td>{log.performedBy?.username}</td>
              <td>{log.targetUser?.username}</td>
              <td>{log.description}</td>
              <td>
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAuditActionUsers;