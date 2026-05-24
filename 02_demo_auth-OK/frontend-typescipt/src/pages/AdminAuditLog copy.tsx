import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000";

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const res = await fetch(`${API_BASE}/api/admin/audit`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await res.json();
    if (res.ok) setLogs(data);
  };

  //
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  //
  const toggleSelectLog = (id: number) => {
      setSelectedIds(prev =>
        prev.includes(id)
          ? prev.filter(i => i !== id)
          : [...prev, id]
      );
    };
    //
    const toggleSelectAll = () => {
      if (selectedIds.length === logs.length) {
        setSelectedIds([]);
      } else {
        setSelectedIds(logs.map(l => l.id));
      }
    };
    //
    const handleDeleteLogs = async () => {
      if (selectedIds.length === 0) {
        alert("Veuillez sélectionner au moins un log");
        return;
      }
      const confirmed = window.confirm(
        `⚠️ Voulez-vous vraiment supprimer ${selectedIds.length} log(s) ?`
      );

      if (!confirmed) return;

      const res = await fetch(
        `${API_BASE}/api/admin/audit/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ logIds: selectedIds })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Logs supprimés avec succès");

      setSelectedIds([]);
      loadLogs();
    };
    //
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Audit Log</h1>

      <div className="flex justify-between mb-4">
        <div>
          {selectedIds.length > 0 && (
            <span className="text-red-600 font-medium">
              {selectedIds.length} sélectionné(s)
            </span>
          )}
        </div>

        <button
          onClick={handleDeleteLogs}
          className="btn-danger px-4 py-2 text-sm"
        >
          Supprimer sélection
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  logs.length > 0 &&
                  selectedIds.length === logs.length
                }
                onChange={toggleSelectAll}
              />
            </th>
            <th>Date</th>
            <th>Action</th>
            <th>Admin</th>
            <th>Description</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(log.id)}
                  onChange={() => toggleSelectLog(log.id)}
                />
              </td>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
              <td>{log.action}</td>
              <td>{log.admin?.username}</td>
              <td>{log.description}</td>
              <td>{log.ipAddress}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAuditLogs;