import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Search, Plus, Edit, Trash2, Plane,
  FileText, FileSpreadsheet
} from 'lucide-react';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  const [compagnies, setCompagnies] = useState<any[]>([]);

  /* 🔍 Recherche & filtres */
  const [search, setSearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [compagnieFilter, setCompagnieFilter] = useState('');

  /* 📄 Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      setVols(res.data);
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

  /* ================= FILTRAGE + TRI ================= */

  const filteredVols = useMemo(() => {
    return vols
      .filter(v => {
        const term = search.toLowerCase();

        const matchSearch =
          v.codeVol.toLowerCase().includes(term) ||
          v.zone.toLowerCase().includes(term) ||
          v.provenanceDestination.toLowerCase().includes(term) ||
          v.compagnie?.nomCompagnie.toLowerCase().includes(term);

        const matchZone = zoneFilter ? v.zone === zoneFilter : true;
        const matchCompagnie = compagnieFilter
          ? v.compagnie?.id === Number(compagnieFilter)
          : true;

        return matchSearch && matchZone && matchCompagnie;
      })
      .sort((a, b) =>
        a.codeVol.localeCompare(b.codeVol, 'fr', { sensitivity: 'base' })
      );
  }, [vols, search, zoneFilter, compagnieFilter]);

  /* reset pagination */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, zoneFilter, compagnieFilter, rowsPerPage]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredVols.length / rowsPerPage);
  const paginatedVols = filteredVols.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  /* ================= EXPORT ================= */

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Liste des Vols', 14, 10);

    autoTable(doc, {
      head: [['Code Vol', 'Zone', 'Compagnie', 'Provenance / Destination']],
      body: filteredVols.map(v => [
        v.codeVol,
        v.zone,
        v.compagnie?.nomCompagnie || '',
        v.provenanceDestination
      ])
    });

    doc.save('vols.pdf');
    notifySuccess('Export PDF réussi');
  };

  const exportExcel = () => {
    const data = filteredVols.map(v => ({
      Code_Vol: v.codeVol,
      Zone: v.zone,
      Compagnie: v.compagnie?.nomCompagnie,
      Provenance_Destination: v.provenanceDestination
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vols');

    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buffer]), 'vols.xlsx');

    notifySuccess('Export Excel réussi');
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
      loadVols();
    } catch {
      notifyError("Erreur lors de l'enregistrement");
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

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="page-header flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Plane className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion des Vols</h1>
          <span className="badge badge-primary">
            {filteredVols.length} élément(s) trouvé(s)
          </span>
        </div>

        <div className="flex gap-2">
          <button className="btn-outline" onClick={exportPDF}>
            <FileText className="w-4 h-4" /> PDF
          </button>
          <button className="btn-outline" onClick={exportExcel}>
            <FileSpreadsheet className="w-4 h-4" /> Excel
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-card p-4 rounded-xl border">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Recherche globale..."
          className="search-input"
        />

        <select className="form-select" value={zoneFilter} onChange={e => setZoneFilter(e.target.value)}>
          <option value="">Toutes les zones</option>
          <option value="ARRIVEE">ARRIVEE</option>
          <option value="DEPART">DEPART</option>
          <option value="TRANSIT">TRANSIT</option>
        </select>

        <select
          className="form-select"
          value={compagnieFilter}
          onChange={e => setCompagnieFilter(e.target.value)}
        >
          <option value="">Toutes les compagnies</option>
          {compagnies.map(c => (
            <option key={c.id} value={c.id}>{c.nomCompagnie}</option>
          ))}
        </select>

        <select
          value={rowsPerPage}
          onChange={e => setRowsPerPage(Number(e.target.value))}
          className="form-select"
        >
          <option value={5}>5 lignes</option>
          <option value={10}>10 lignes</option>
          <option value={25}>25 lignes</option>
        </select>
      </div>

      {/* SEARCH + FILTERS + EXPORT */}
        {/* <div className="bg-card p-4 rounded-xl border flex flex-wrap gap-3 items-center">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Recherche globale..."
            className="pl-10 px-3 py-2 border rounded-md"
            />
        </div>

        <select
            value={zoneFilter}
            onChange={e => setZoneFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
        >
            <option value="">Toutes les zones</option>
            <option value="ARRIVEE">ARRIVEE</option>
            <option value="DEPART">DEPART</option>
            <option value="TRANSIT">TRANSIT</option>
        </select>

        <select
            value={compagnieFilter}
            onChange={e => setCompagnieFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
        >
            <option value="">Toutes les compagnies</option>
            {compagnies.map(c => (
            <option key={c.id} value={c.id}>{c.nomCompagnie}</option>
            ))}
        </select>

        <button
            onClick={exportPDF}
            className="px-3 py-2 border rounded-md flex items-center gap-2"
        >
            📄 PDF
        </button>

        <button
            onClick={exportExcel}
            className="px-3 py-2 border rounded-md flex items-center gap-2"
        >
            📊 Excel
        </button>

        </div> */}


      {/* TABLE */}
      <div className="bg-card rounded-xl overflow-hidden">
        <table className="data-table text-center">
          <thead>
            <tr>
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
                  <strong>{v.compagnie?.nomCompagnie}</strong><br />
                  <span className="badge badge-warning">{v.codeVol}</span>
                </td>
                <td>{v.zone}</td>
                <td>{v.provenanceDestination}</td>
                <td>
                  <Edit className="cursor-pointer mr-2"
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
                    }} />
                  <Trash2 className="cursor-pointer text-red-600"
                    onClick={() => deleteVol(v.id!)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center px-4 py-3">
        <div></div>
        <div className="flex gap-1">
          {pages.map(p => (
            <button
              key={p}
              className={`page-btn ${p === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* MODAL — inchangé */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={submitForm} className="space-y-4">
              <input className="form-input" placeholder="Code Vol"
                value={formData.codeVol}
                onChange={e => setFormData({ ...formData, codeVol: e.target.value })} />
              <input className="form-input" placeholder="Description"
                value={formData.descVol}
                onChange={e => setFormData({ ...formData, descVol: e.target.value })} />
              <input className="form-input" placeholder="Provenance / Destination"
                value={formData.provenanceDestination}
                onChange={e => setFormData({ ...formData, provenanceDestination: e.target.value })} />
              <select className="form-select"
                value={formData.zone}
                onChange={e => setFormData({ ...formData, zone: e.target.value })}>
                <option value="">Zone</option>
                <option value="ARRIVEE">ARRIVEE</option>
                <option value="DEPART">DEPART</option>
                <option value="TRANSIT">TRANSIT</option>
              </select>
              <select className="form-select"
                value={formData.compagnieId}
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
