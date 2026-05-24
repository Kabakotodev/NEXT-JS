import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Edit, Trash2, Plane } from 'lucide-react';
import {
  notifySuccess,
  notifyError,
  notifyWarning
} from '@/utils/toast';

const API = 'http://localhost:8085/api';

interface Vol {
  id?: number;
  codeVol: string;
  descVol: string;
  provenanceDestination: string;
  zone: 'ARRIVEE' | 'DEPART' | 'TRANSIT';
  compagnie?: {
    id: number;
    nomCompagnie: string;
  };
}

const Vols = () => {
  const [vols, setVols] = useState<Vol[]>([]);
  const [filteredVols, setFilteredVols] = useState<Vol[]>([]);
  const [compagnies, setCompagnies] = useState<any[]>([]);

  /* 🔍 Recherche */
  const [search, setSearch] = useState('');

  /* 📄 Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ✅ Sélection multiple */
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [editingVol, setEditingVol] = useState<Vol | null>(null);

  const [formData, setFormData] = useState<any>({
    codeVol: '',
    descVol: '',
    provenanceDestination: '',
    zone: '',
    compagnieId: ''
  });

  /* ================= LOAD DATA ================= */

  const loadVols = async () => {
    try {
      const res = await axios.get(`${API}/vols`);
      const sorted = res.data.sort((a: Vol, b: Vol) =>
        a.codeVol.localeCompare(b.codeVol)
      );
      setVols(sorted);
      setFilteredVols(sorted);
    } catch {
      notifyError("Erreur lors du chargement des vols");
    }
  };

  const loadCompagnies = async () => {
    try {
      const res = await axios.get(`${API}/compagnies`);
      setCompagnies(res.data);
    } catch {
      notifyError("Erreur lors du chargement des compagnies");
    }
  };

  useEffect(() => {
    loadVols();
    loadCompagnies();
  }, []);

  /* ================= SEARCH ================= */

  useEffect(() => {
    let data = [...vols];

    if (search) {
      data = data.filter(v =>
        v.codeVol.toLowerCase().includes(search.toLowerCase()) ||
        v.provenanceDestination.toLowerCase().includes(search.toLowerCase()) ||
        v.compagnie?.nomCompagnie.toLowerCase().includes(search.toLowerCase()) ||
        v.zone.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredVols(data);
    setCurrentPage(1);
    setSelectedIds([]);
  }, [search, vols]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredVols.length / rowsPerPage);

  const paginatedVols = filteredVols.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  /* ================= SÉLECTION ================= */

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (
      paginatedVols.length > 0 &&
      selectedIds.length === paginatedVols.length
    ) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedVols.map(v => v.id!));
    }
  };

  /* ================= CRUD ================= */

  const submitForm = async (e: any) => {
    e.preventDefault();

    if (!formData.codeVol || !formData.zone || !formData.compagnieId) {
      notifyWarning("Veuillez remplir les champs obligatoires");
      return;
    }

    const payload = {
      codeVol: formData.codeVol,
      descVol: formData.descVol,
      provenanceDestination: formData.provenanceDestination,
      zone: formData.zone,
      compagnie: { id: formData.compagnieId }
    };

    try {
      if (editingVol?.id) {
        await axios.put(`${API}/vols/${editingVol.id}`, payload);
        notifySuccess("Vol modifié avec succès");
      } else {
        await axios.post(`${API}/vols`, payload);
        notifySuccess("Vol ajouté avec succès");
      }

      setShowModal(false);
      setEditingVol(null);
      loadVols();
    } catch (err: any) {
      if (err.response?.data) {
        notifyError(err.response.data);
      } else {
        notifyError("Erreur lors de l'enregistrement");
      }
    }
  };

  const deleteVol = async (id: number) => {
    if (!window.confirm("Supprimer ce vol ?")) return;

    try {
      await axios.delete(`${API}/vols/${id}`);
      notifySuccess("Vol supprimé");
      loadVols();
    } catch {
      notifyError("Erreur lors de la suppression");
    }
  };

  const deleteSelected = async () => {
    if (!window.confirm(`Supprimer ${selectedIds.length} vols ?`)) return;

    try {
      await Promise.all(
        selectedIds.map(id =>
          axios.delete(`${API}/vols/${id}`)
        )
      );

      notifySuccess("Vols supprimés avec succès");
      setSelectedIds([]);
      loadVols();
    } catch {
      notifyError("Erreur lors de la suppression multiple");
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="page-header flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Plane className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion des Vols</h1>
          <span className="badge badge-primary">{filteredVols.length} résultats</span>
        </div>

        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <button className="btn-danger" onClick={deleteSelected}>
              <Trash2 className="w-4 h-4" />
              Supprimer ({selectedIds.length})
            </button>
          )}

          <button
            className="btn-primary"
            onClick={() => {
              setEditingVol(null);
              setFormData({
                codeVol: '',
                descVol: '',
                provenanceDestination: '',
                zone: '',
                compagnieId: ''
              });
              setShowModal(true);
            }}
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="bg-card rounded-xl shadow-sm border p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par vol, zone, compagnie..."
            className="search-input pl-10"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl overflow-hidden">
        <table className="data-table text-center">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    paginatedVols.length > 0 &&
                    selectedIds.length === paginatedVols.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th>VOL</th>
              <th>ZONE</th>
              <th>PROVENANCE / DESTINATION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVols.map(v => (
              <tr
                key={v.id}
                className={selectedIds.includes(v.id!) ? 'bg-gray-50' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(v.id!)}
                    onChange={() => toggleSelect(v.id!)}
                  />
                </td>
                <td>
                  <strong>{v.compagnie?.nomCompagnie}</strong><br />
                  <span className="badge badge-warning">{v.codeVol}</span>
                </td>
                <td>
                  <span className={`badge ${
                    v.zone === 'ARRIVEE' ? 'badge-success' :
                    v.zone === 'DEPART' ? 'badge-primary' : 'badge-warning'
                  }`}>
                    {v.zone}
                  </span>
                </td>
                <td>{v.provenanceDestination}</td>
                <td>
                  <Edit
                    className="inline cursor-pointer mr-2"
                    onClick={() => {
                      setEditingVol(v);
                      setFormData({
                        codeVol: v.codeVol,
                        descVol: v.descVol,
                        provenanceDestination: v.provenanceDestination,
                        zone: v.zone,
                        compagnieId: v.compagnie?.id
                      });
                      setShowModal(true);
                    }}
                  />
                  <Trash2
                    className="inline cursor-pointer text-red-600"
                    onClick={() => deleteVol(v.id!)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <select
          value={rowsPerPage}
          onChange={e => {
            setRowsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="form-select w-20"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`page-btn ${p === currentPage ? 'active' : ''}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={submitForm} className="space-y-4">
              <input className="form-input" placeholder="Code Vol"
                value={formData.codeVol}
                onChange={e => setFormData({ ...formData, codeVol: e.target.value })}
              />

              <input className="form-input" placeholder="Description"
                value={formData.descVol}
                onChange={e => setFormData({ ...formData, descVol: e.target.value })}
              />

              <input className="form-input" placeholder="Provenance / Destination"
                value={formData.provenanceDestination}
                onChange={e => setFormData({ ...formData, provenanceDestination: e.target.value })}
              />

              <select className="form-select"
                value={formData.zone}
                onChange={e => setFormData({ ...formData, zone: e.target.value })}
              >
                <option value="">Zone</option>
                <option value="ARRIVEE">ARRIVEE</option>
                <option value="DEPART">DEPART</option>
                <option value="TRANSIT">TRANSIT</option>
              </select>

              <select className="form-select"
                value={formData.compagnieId}
                onChange={e => setFormData({ ...formData, compagnieId: e.target.value })}
              >
                <option value="">Compagnie</option>
                {compagnies.map(c => (
                  <option key={c.id} value={c.id}>{c.nomCompagnie}</option>
                ))}
              </select>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
                <button className="btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Vols;
