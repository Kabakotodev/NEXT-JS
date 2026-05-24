// import { useEffect, useState } from "react";

// const API_BASE = "http://localhost:4000";

// interface AuditLog {
//   id: number;
//   action: string;
//   description: string;
//   ipAddress: string;
//   createdAt: string;
//   performedBy?: {
//     id: number;
//     prenom: string;
//     nom: string;
//     username: string;
//   };
// }

// const AdminAuditLogs = () => {
//   const [logs, setLogs] = useState<AuditLog[]>([]);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);

//   useEffect(() => {
//     loadLogs();
//   }, []);

//   const loadLogs = async () => {
//     const res = await fetch(`${API_BASE}/api/admin/audit`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     const data = await res.json();
//     if (res.ok) setLogs(data);
//   };

//   const toggleSelectLog = (id: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(id)
//         ? prev.filter((i) => i !== id)
//         : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selectedIds.length === logs.length) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(logs.map((l) => l.id));
//     }
//   };

//   const handleDeleteLogs = async () => {
//     if (selectedIds.length === 0) {
//       alert("Veuillez sélectionner au moins un log");
//       return;
//     }

//     const confirmed = window.confirm(
//       `⚠️ Voulez-vous vraiment supprimer ${selectedIds.length} log(s) ?`
//     );
//     if (!confirmed) return;

//     const res = await fetch(
//       `${API_BASE}/api/admin/audit/delete`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ logIds: selectedIds }),
//       }
//     );

//     const data = await res.json();
//     if (!res.ok) {
//       alert(data.error);
//       return;
//     }

//     alert("Logs supprimés avec succès");
//     setSelectedIds([]);
//     loadLogs();
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-xl font-bold">Audit Log</h1>

//       <div className="flex justify-between mb-4">
//         <div>
//           {selectedIds.length > 0 && (
//             <span className="text-red-600 font-medium">
//               {selectedIds.length} sélectionné(s)
//             </span>
//           )}
//         </div>

//         <button
//           onClick={handleDeleteLogs}
//           className="btn-danger px-4 py-2 text-sm"
//         >
//           Supprimer sélection
//         </button>
//       </div>

//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 checked={
//                   logs.length > 0 &&
//                   selectedIds.length === logs.length
//                 }
//                 onChange={toggleSelectAll}
//               />
//             </th>
//             <th>Date</th>
//             <th>Action</th>
//             <th>Admin</th>
//             <th>Description</th>
//             <th>IP</th>
//           </tr>
//         </thead>

//         <tbody>
//           {logs.map((log) => (
//             <tr key={log.id}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.includes(log.id)}
//                   onChange={() => toggleSelectLog(log.id)}
//                 />
//               </td>

//               <td>
//                 {new Date(log.createdAt).toLocaleString()}
//               </td>

//               <td>{log.action}</td>

//               {/* ✅ CORRECTION ICI */}
//               <td>
//                 {log.performedBy
//                   ? `${log.performedBy.prenom} ${log.performedBy.nom}`
//                   : "Système"}
//               </td>

//               <td>{log.description}</td>

//               <td>{log.ipAddress}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminAuditLogs;



"use client";

import { useEffect, useState } from "react";
import { Search, History, Clock, User } from "lucide-react";

const API_BASE = "http://localhost:4000";

interface AuditLog {
  id: number;
  action: string;
  description: string;
  ipAddress: string;
  createdAt: string;
  performedBy?: {
    prenom: string;
    nom: string;
    username: string;
  };
}

const AdminAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* ===============================
     FETCH LOGS
  ================================= */
  const loadLogs = async () => {
    const res = await fetch(`${API_BASE}/api/admin/audit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok) {
      setAuditLogs(data);
      setFilteredLogs(data);
    }
  };

  useEffect(() => {
    if (token) loadLogs();
  }, [token]);

  /* ===============================
     SEARCH
  ================================= */
  useEffect(() => {
    if (searchTerm) {
      const result = auditLogs.filter((log) =>
        JSON.stringify(log)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredLogs(result);
    } else {
      setFilteredLogs(auditLogs);
    }
    setCurrentPage(1);
  }, [searchTerm, auditLogs]);

  /* ===============================
     SELECTION
  ================================= */
  const toggleSelectLog = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredLogs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLogs.map((l) => l.id));
    }
  };

  const handleDeleteLogs = async () => {
    if (selectedIds.length === 0) {
      alert("Veuillez sélectionner au moins un log");
      return;
    }

    const confirmed = window.confirm(
      `⚠️ Supprimer ${selectedIds.length} log(s) ?`
    );
    if (!confirmed) return;

    const res = await fetch(
      `${API_BASE}/api/admin/audit/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ logIds: selectedIds }),
      }
    );

    if (res.ok) {
      setSelectedIds([]);
      loadLogs();
    }
  };

  /* ===============================
     PAGINATION
  ================================= */
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(
    filteredLogs.length / itemsPerPage
  );

  const getActionBadge = (action: string) => {
    const badges: Record<string, string> = {
      LOGIN_SUCCESS: "bg-green-100 text-green-800",
      LOGIN_FAILED: "bg-red-100 text-red-800",
      UPDATE_USER: "bg-yellow-100 text-yellow-800",
      DELETE_USER: "bg-red-600 text-white",
      REGISTER: "bg-blue-500 text-white",
    };
    return badges[action] || "badge-primary";
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* HEADER */}
      <div className="page-header">
        <div className="flex items-center gap-3">
          <History className="w-8 h-8 text-primary" />
          <h1 className="page-title">Audit & Historique</h1>
        </div>
      </div>

      {/* SEARCH BAR */}
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

          <div className="flex items-center gap-4">
            {selectedIds.length > 0 && (
              <span className="text-red-600 font-medium">
                {selectedIds.length} sélectionné(s)
              </span>
            )}

            <button
              onClick={handleDeleteLogs}
              className="btn-danger px-4 py-2 text-sm"
            >
              Supprimer sélection
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      filteredLogs.length > 0 &&
                      selectedIds.length === filteredLogs.length
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
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
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(log.id)}
                      onChange={() =>
                        toggleSelectLog(log.id)
                      }
                    />
                  </td>

                  <td>{log.id}</td>

                  <td className="font-medium">
                    {log.performedBy
                      ? `${log.performedBy.prenom} ${log.performedBy.nom}`
                      : "Système"}
                  </td>

                  <td>
                    <span
                      className={`badge ${getActionBadge(
                        log.action
                      )}`}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td>{log.description}</td>

                  <td>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {log.ipAddress}
                    </code>
                  </td>

                  <td>
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Afficher
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) =>
                setItemsPerPage(Number(e.target.value))
              }
              className="form-select w-20"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.max(1, p - 1)
                )
              }
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Précédent
            </button>

            <span className="text-sm">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuditLogs;