import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Building2 } from "lucide-react";
import {
  notifySuccess,
  notifyError,
  notifyWarning,
} from "../utils/toast";

const API_URL = "http://localhost:8085/api/compagnies";

interface Compagnie {
  id: number;
  nomCompagnie: string;
  sigleCompagnie: string;
  descCompagnie: string;
  nationaliteCompagnie: string;
}

const Compagnies = () => {
  const [compagnies, setCompagnies] = useState<Compagnie[]>([]);
  const [filteredCompagnies, setFilteredCompagnies] = useState<Compagnie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingCompagnie, setEditingCompagnie] =
    useState<Compagnie | null>(null);

  const [formData, setFormData] = useState<Compagnie>({
    id: 0,
    nomCompagnie: "",
    sigleCompagnie: "",
    descCompagnie: "",
    nationaliteCompagnie: "",
  });

  /* ======================= API ======================= */
  const loadCompagnies = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCompagnies(data);
      setFilteredCompagnies(data);
    } catch {
      notifyError("❌ Impossible de charger les compagnies");
    }
  };

  const createCompagnie = async () => {
    try {
      if (!formData.nomCompagnie || !formData.sigleCompagnie) {
        notifyWarning("⚠️ Nom et sigle sont obligatoires");
        return;
      }

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      notifySuccess("✅ Compagnie créée avec succès");
      loadCompagnies();
    } catch {
      notifyError("❌ Échec de la création de la compagnie");
    }
  };

  const updateCompagnie = async () => {
    if (!editingCompagnie) return;

    try {
      const res = await fetch(
        `${API_URL}/${editingCompagnie.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error();

      notifySuccess("✏️ Compagnie modifiée avec succès");
      loadCompagnies();
    } catch {
      notifyError("❌ Échec de la modification de la compagnie");
    }
  };

  const deleteCompagnie = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();

      notifySuccess("🗑️ Compagnie supprimée");
      loadCompagnies();
    } catch {
      notifyError("❌ Suppression impossible");
    }
  };

  /* ======================= EFFECTS ======================= */
  useEffect(() => {
    loadCompagnies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCompagnies(
        compagnies.filter(c =>
          Object.values(c)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCompagnies(compagnies);
    }
    setCurrentPage(1);
  }, [searchTerm, compagnies]);

  /* ======================= PAGINATION ======================= */
  const paginatedData = filteredCompagnies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCompagnies.length / itemsPerPage);

  /* ======================= HANDLERS ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    editingCompagnie ? await updateCompagnie() : await createCompagnie();
    setShowModal(false);
    setEditingCompagnie(null);
    setFormData({
      id: 0,
      nomCompagnie: "",
      sigleCompagnie: "",
      descCompagnie: "",
      nationaliteCompagnie: "",
    });
  };

  const toggleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === paginatedData.length
        ? []
        : paginatedData.map(c => c.id)
    );
  };

  const handleDeleteSelected = async () => {
    if (
      !window.confirm(
        `Supprimer ${selectedItems.length} compagnie(s) ?`
      )
    )
      return;

    try {
      await Promise.all(
        selectedItems.map(id => deleteCompagnie(id))
      );
      setSelectedItems([]);
      notifySuccess(
        `🗑️ ${selectedItems.length} compagnie(s) supprimée(s)`
      );
    } catch {
      notifyError("❌ Erreur lors de la suppression multiple");
    }
  };

  /* ======================= JSX ======================= */
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary" />
          <h1 className="page-title">
            Gestion des Compagnies
          </h1>
          <span className="badge badge-primary">
            {filteredCompagnies.length} compagnie(s)
          </span>
        </div>

        <div className="flex gap-3">
          {selectedItems.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="btn-danger flex gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer ({selectedItems.length})
            </button>
          )}

          <button
            className="btn-primary flex gap-2"
            onClick={() => {
              setEditingCompagnie(null);
              setFormData({
                id: 0,
                nomCompagnie: "",
                sigleCompagnie: "",
                descCompagnie: "",
                nationaliteCompagnie: "",
              });
              setShowModal(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Ajouter
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
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Nom</th>
              <th>Sigle</th>
              <th>Description</th>
              <th>Nationalité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(compagnie => (
              <tr key={compagnie.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(
                      compagnie.id
                    )}
                    onChange={() =>
                      setSelectedItems(p =>
                        p.includes(compagnie.id)
                          ? p.filter(
                              i => i !== compagnie.id
                            )
                          : [...p, compagnie.id]
                      )
                    }
                  />
                </td>
                <td>{compagnie.id}</td>
                <td className="font-medium">
                  {compagnie.nomCompagnie}
                </td>
                <td>
                  <span className="badge badge-primary">
                    {compagnie.sigleCompagnie}
                  </span>
                </td>
                <td>{compagnie.descCompagnie}</td>
                <td>{compagnie.nationaliteCompagnie}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCompagnie(compagnie);
                      setFormData(compagnie);
                      setShowModal(true);
                    }}
                  >
                    <Edit className="w-4 h-4 text-yellow-600" />
                  </button>
                  <button
                    onClick={() =>
                      deleteCompagnie(compagnie.id)
                    }
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-white rounded-b-xl">
            {/* Left: items per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Afficher
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="form-select w-20"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Right: navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
                disabled={currentPage === 1}
                className="px-4 py-1.5 rounded-lg border border-border text-sm disabled:opacity-50"
              >
                Précédent
              </button>

              <span className="text-sm font-medium">
                {currentPage} / {totalPages || 1}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(totalPages, p + 1)
                  )
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-4 py-1.5 rounded-lg border border-border text-sm disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>

          {/*  */}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl mb-4">
              {editingCompagnie
                ? "Modifier Compagnie"
                : "Nouvelle Compagnie"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                className="form-input"
                placeholder="Nom de la compagnie"
                value={formData.nomCompagnie}
                onChange={e =>
                  setFormData({
                    ...formData,
                    nomCompagnie: e.target.value,
                  })
                }
                required
              />
              <input
                className="form-input"
                placeholder="Sigle"
                value={formData.sigleCompagnie}
                onChange={e =>
                  setFormData({
                    ...formData,
                    sigleCompagnie: e.target.value,
                  })
                }
                required
              />
              <textarea
                className="form-input"
                placeholder="Description"
                value={formData.descCompagnie}
                onChange={e =>
                  setFormData({
                    ...formData,
                    descCompagnie: e.target.value,
                  })
                }
              />
              <input
                className="form-input"
                placeholder="Nationalité"
                value={formData.nationaliteCompagnie}
                onChange={e =>
                  setFormData({
                    ...formData,
                    nationaliteCompagnie:
                      e.target.value,
                  })
                }
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingCompagnie ? "Modifier" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compagnies;
