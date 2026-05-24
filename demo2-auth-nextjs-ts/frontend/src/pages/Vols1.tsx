import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Edit, Trash2, Plane } from 'lucide-react';

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
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [searchGlobal, setSearchGlobal] = useState('');
  const [filterCode, setFilterCode] = useState('');
  const [filterZone, setFilterZone] = useState('');
  const [filterCompagnie, setFilterCompagnie] = useState('');

  const [statsZones, setStatsZones] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVol, setEditingVol] = useState<Vol | null>(null);

  const [formData, setFormData] = useState<any>({
    codeVol: '',
    descVol: '',
    provenanceDestination: '',
    zone: '',
    compagnieId: ''
  });

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ================= LOAD DATA ================= */

  const loadVols = async () => {
    const res = await axios.get(`${API}/vols`);
    setVols(res.data);
    setFilteredVols(res.data);
  };

  const loadCompagnies = async () => {
    const res = await axios.get(`${API}/compagnies`);
    setCompagnies(res.data);
  };

  const loadStats = async () => {
    const res = await axios.get(`${API}/vols/stats/zones`);
    setStatsZones(res.data);
  };

  useEffect(() => {
    loadVols();
    loadCompagnies();
    loadStats();
  }, []);

  /* ================= SEARCH ================= */

  useEffect(() => {
    let data = [...vols];

    if (filterCode)
      data = data.filter(v => v.codeVol?.toLowerCase().includes(filterCode.toLowerCase()));

    if (filterZone)
      data = data.filter(v => v.zone === filterZone);

    if (filterCompagnie)
      data = data.filter(v => v.compagnie?.nomCompagnie === filterCompagnie);

    if (searchGlobal)
      data = data.filter(v =>
        Object.values(v).some(val =>
          JSON.stringify(val).toLowerCase().includes(searchGlobal.toLowerCase())
        )
      );

    setFilteredVols(data);
    setCurrentPage(1); // reset pagination
  }, [filterCode, filterZone, filterCompagnie, searchGlobal, vols]);

  /* ================= PAGINATION LOGIC ================= */

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedVols = filteredVols.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredVols.length / rowsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  /* ================= CRUD ================= */

  const submitForm = async (e: any) => {
    e.preventDefault();

    const payload = {
      codeVol: formData.codeVol,
      descVol: formData.descVol,
      provenanceDestination: formData.provenanceDestination,
      zone: formData.zone,
      compagnie: { id: formData.compagnieId }
    };

    if (editingVol?.id) {
      await axios.put(`${API}/vols/${editingVol.id}`, payload);
    } else {
      await axios.post(`${API}/vols`, payload);
    }

    setShowModal(false);
    setEditingVol(null);
    loadVols();
    loadStats();
  };

  const deleteVol = async (id: number) => {
    if (window.confirm('Supprimer ce vol ?')) {
      await axios.delete(`${API}/vols/${id}`);
      loadVols();
      loadStats();
    }
  };

  const deleteMultiple = async () => {
    if (window.confirm(`Supprimer ${selectedItems.length} vols ?`)) {
      await axios.post(`${API}/vols/delete-multiple`, selectedItems);
      setSelectedItems([]);
      loadVols();
      loadStats();
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Plane className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion des Vols</h1>
          <span className="badge badge-primary">{filteredVols.length} résultats</span>
        </div>

        <div className="flex gap-2">
          {selectedItems.length > 0 && (
            <button className="btn-danger" onClick={deleteMultiple}>
              <Trash2 className="w-4 h-4" /> Supprimer ({selectedItems.length})
            </button>
          )}
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      </div>

      {/* SEARCH FILTERS */}
      <div className="grid grid-cols-3 gap-4 bg-card p-4 rounded-xl">
        <input className="form-input" placeholder="Code Vol"
          onChange={e => setFilterCode(e.target.value)} />

        <select className="form-select" onChange={e => setFilterZone(e.target.value)}>
          <option value="">Zone</option>
          <option value="ARRIVEE">ARRIVEE</option>
          <option value="DEPART">DEPART</option>
          <option value="TRANSIT">TRANSIT</option>
        </select>

        <select className="form-select" onChange={e => setFilterCompagnie(e.target.value)}>
          <option value="">Compagnie</option>
          {compagnies.map(c => (
            <option key={c.id}>{c.nomCompagnie}</option>
          ))}
        </select>
      </div>

      {/* SEARCH GLOBAL */}
      <div className="bg-card p-4 rounded-xl">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4" />
          <input className="search-input pl-10"
            placeholder="Recherche globale..."
            onChange={e => setSearchGlobal(e.target.value)} />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl overflow-hidden">
        <table className="data-table table text-center">
          <thead>
            <tr>
              <th></th>
              <th>VOL</th>
              <th>ZONE</th>
              <th>PROVENANCE / DESTINATION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVols.map(v => (
              <tr key={v.id}>
                <td>
                  <input type="checkbox"
                    onChange={() =>
                      setSelectedItems(p =>
                        p.includes(v.id!) ? p.filter(i => i !== v.id) : [...p, v.id!]
                      )
                    }
                  />
                </td>

                <td>
                  <strong>{v.compagnie?.nomCompagnie}</strong><br />
                  <span className="badge badge-warning">{v.codeVol}</span>
                </td>

                <td><span className="badge badge-success">{v.zone}</span></td>

                <td>{v.provenanceDestination}</td>

                <td>
                  <Edit className="inline cursor-pointer mr-2"
                    onClick={() => { setEditingVol(v); setShowModal(true); }} />
                  <Trash2 className="inline cursor-pointer text-red-600"
                    onClick={() => deleteVol(v.id!)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* BADGES */}
        <div className="p-4 flex flex-wrap gap-2">
          <span className="badge badge-primary">Total : {vols.length}</span>
          {statsZones.map((s: any, i: number) => (
            <span key={i} className="badge badge-secondary">
              {s.zone} : {s.total}
            </span>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 pb-4">

          <div className="flex items-center gap-2">
            <span>Afficher</span>
            <select
              className="form-select w-20"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>lignes</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="px-2 py-1 border rounded"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              «
            </button>

            <button
              className="px-2 py-1 border rounded"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              ‹
            </button>

            {pageNumbers.map(n => (
              <button
                key={n}
                className={`px-3 py-1 border rounded ${
                  n === currentPage ? 'bg-primary text-white' : ''
                }`}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </button>
            ))}

            <button
              className="px-2 py-1 border rounded"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              ›
            </button>

            <button
              className="px-2 py-1 border rounded"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              »
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={submitForm} className="space-y-4">
              <input className="form-input" placeholder="Code Vol"
                onChange={e => setFormData({ ...formData, codeVol: e.target.value })} />

              <input className="form-input" placeholder="Description"
                onChange={e => setFormData({ ...formData, descVol: e.target.value })} />

              <input className="form-input" placeholder="Provenance / Destination"
                onChange={e => setFormData({ ...formData, provenanceDestination: e.target.value })} />

              <select className="form-select"
                onChange={e => setFormData({ ...formData, zone: e.target.value })}>
                <option value="">Zone</option>
                <option value="ARRIVEE">ARRIVEE</option>
                <option value="DEPART">DEPART</option>
                <option value="TRANSIT">TRANSIT</option>
              </select>

              <select className="form-select"
                onChange={e => setFormData({ ...formData, compagnieId: e.target.value })}>
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
