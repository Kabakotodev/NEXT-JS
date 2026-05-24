import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Activity, CheckSquare } from 'lucide-react';

interface Flux {
  id: number;
  dateFlux: string;
  codeVol: string;
  zone: 'ARRIVEE' | 'DEPART' | 'TRANSIT';
  nbrePaxSn: number;
  nbrePaxAutre: number;
  periode: 'MATIN' | 'APRES MIDI';
  user_id: number;
}

const GestionFlux = () => {
  const [fluxList, setFluxList] = useState<Flux[]>([]);
  const [filteredFlux, setFilteredFlux] = useState<Flux[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState('');
  const [periodeFilter, setPeriodeFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingFlux, setEditingFlux] = useState<Flux | null>(null);

  // Mock data
  useEffect(() => {
    const mockFlux: Flux[] = [
      { id: 1, dateFlux: '2024-01-15T08:30:00', codeVol: 'AF1234', zone: 'ARRIVEE', nbrePaxSn: 120, nbrePaxAutre: 45, periode: 'MATIN', user_id: 1 },
      { id: 2, dateFlux: '2024-01-15T09:00:00', codeVol: 'TK5678', zone: 'DEPART', nbrePaxSn: 85, nbrePaxAutre: 120, periode: 'MATIN', user_id: 1 },
      { id: 3, dateFlux: '2024-01-15T14:30:00', codeVol: 'EK9012', zone: 'ARRIVEE', nbrePaxSn: 200, nbrePaxAutre: 150, periode: 'APRES MIDI', user_id: 2 },
      { id: 4, dateFlux: '2024-01-15T15:45:00', codeVol: 'AF4321', zone: 'TRANSIT', nbrePaxSn: 50, nbrePaxAutre: 80, periode: 'APRES MIDI', user_id: 1 },
      { id: 5, dateFlux: '2024-01-15T16:00:00', codeVol: 'LH2468', zone: 'DEPART', nbrePaxSn: 175, nbrePaxAutre: 90, periode: 'APRES MIDI', user_id: 2 },
    ];
    setFluxList(mockFlux);
    setFilteredFlux(mockFlux);
  }, []);

  useEffect(() => {
    let result = fluxList;

    if (searchTerm) {
      result = result.filter(flux => 
        Object.values(flux).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (zoneFilter) {
      result = result.filter(flux => flux.zone === zoneFilter);
    }

    if (periodeFilter) {
      result = result.filter(flux => flux.periode === periodeFilter);
    }

    setFilteredFlux(result);
    setCurrentPage(1);
  }, [searchTerm, zoneFilter, periodeFilter, fluxList]);

  const paginatedFlux = filteredFlux.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredFlux.length / itemsPerPage);

  const totalPaxSn = filteredFlux.reduce((sum, f) => sum + f.nbrePaxSn, 0);
  const totalPaxAutre = filteredFlux.reduce((sum, f) => sum + f.nbrePaxAutre, 0);
  const totalPax = totalPaxSn + totalPaxAutre;

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedFlux.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedFlux.map(f => f.id));
    }
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Supprimer ${selectedItems.length} élément(s)?`)) {
      setFluxList(fluxList.filter(f => !selectedItems.includes(f.id)));
      setSelectedItems([]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion des Flux</h1>
          <span className="badge badge-primary text-sm px-3 py-1">
            {filteredFlux.length} enregistrement(s)
          </span>
        </div>
        <div className="flex gap-3">
          {selectedItems.length > 0 && (
            <button onClick={handleDeleteSelected} className="btn-danger flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Supprimer ({selectedItems.length})
            </button>
          )}
          <button 
            onClick={() => { setEditingFlux(null); setShowModal(true); }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input pl-10"
              />
            </div>
          </div>
          <select 
            value={zoneFilter} 
            onChange={(e) => setZoneFilter(e.target.value)}
            className="form-select"
          >
            <option value="">Toutes les zones</option>
            <option value="ARRIVEE">ARRIVÉE</option>
            <option value="DEPART">DÉPART</option>
            <option value="TRANSIT">TRANSIT</option>
          </select>
          <select 
            value={periodeFilter} 
            onChange={(e) => setPeriodeFilter(e.target.value)}
            className="form-select"
          >
            <option value="">Toutes les périodes</option>
            <option value="MATIN">MATIN</option>
            <option value="APRES MIDI">APRÈS MIDI</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === paginatedFlux.length && paginatedFlux.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded"
                  />
                </th>
                <th>ID</th>
                <th>Date/Heure</th>
                <th>Code Vol</th>
                <th>Zone</th>
                <th>Pax SN</th>
                <th>Pax Autre</th>
                <th>Période</th>
                <th>User ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFlux.map((flux) => (
                <tr key={flux.id}>
                  <td>
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(flux.id)}
                      onChange={() => toggleSelectItem(flux.id)}
                      className="w-4 h-4 rounded"
                    />
                  </td>
                  <td>{flux.id}</td>
                  <td>{new Date(flux.dateFlux).toLocaleString('fr-FR')}</td>
                  <td><span className="font-medium">{flux.codeVol}</span></td>
                  <td>
                    <span className={`badge ${
                      flux.zone === 'ARRIVEE' ? 'badge-success' : 
                      flux.zone === 'DEPART' ? 'badge-primary' : 'badge-warning'
                    }`}>
                      {flux.zone}
                    </span>
                  </td>
                  <td>{flux.nbrePaxSn}</td>
                  <td>{flux.nbrePaxAutre}</td>
                  <td>
                    <span className={`badge ${flux.periode === 'MATIN' ? 'badge-warning' : 'badge-primary'}`}>
                      {flux.periode}
                    </span>
                  </td>
                  <td>{flux.user_id}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setEditingFlux(flux); setShowModal(true); }}
                        className="p-1.5 hover:bg-muted rounded-lg text-yellow-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Supprimer ce flux?')) {
                            setFluxList(fluxList.filter(f => f.id !== flux.id));
                          }
                        }}
                        className="p-1.5 hover:bg-muted rounded-lg text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals and Pagination */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="badge bg-green-100 text-green-800 px-3 py-1.5">
                Total Pax SN: <strong>{totalPaxSn}</strong>
              </span>
              <span className="badge bg-blue-100 text-blue-800 px-3 py-1.5">
                Total Pax Autre: <strong>{totalPaxAutre}</strong>
              </span>
              <span className="badge bg-purple-100 text-purple-800 px-3 py-1.5">
                Total Pax: <strong>{totalPax}</strong>
              </span>
            </div>
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
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-border disabled:opacity-50"
              >
                ←
              </button>
              <span className="text-sm">
                {currentPage} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-border disabled:opacity-50"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-heading font-semibold mb-4">
              {editingFlux ? 'Modifier Flux' : 'Nouveau Flux'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="form-label">Date et Heure</label>
                <input 
                  type="datetime-local" 
                  className="form-input" 
                  defaultValue={editingFlux?.dateFlux?.slice(0, 16)} 
                />
              </div>
              <div>
                <label className="form-label">Code Vol</label>
                <input type="text" className="form-input" defaultValue={editingFlux?.codeVol} />
              </div>
              <div>
                <label className="form-label">Zone</label>
                <select className="form-select" defaultValue={editingFlux?.zone}>
                  <option value="">Sélectionner</option>
                  <option value="ARRIVEE">ARRIVÉE</option>
                  <option value="DEPART">DÉPART</option>
                  <option value="TRANSIT">TRANSIT</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Pax SN</label>
                  <input type="number" className="form-input" defaultValue={editingFlux?.nbrePaxSn} />
                </div>
                <div>
                  <label className="form-label">Pax Autre</label>
                  <input type="number" className="form-input" defaultValue={editingFlux?.nbrePaxAutre} />
                </div>
              </div>
              <div>
                <label className="form-label">Période</label>
                <select className="form-select" defaultValue={editingFlux?.periode}>
                  <option value="">Sélectionner</option>
                  <option value="MATIN">MATIN</option>
                  <option value="APRES MIDI">APRÈS MIDI</option>
                </select>
              </div>
              <div>
                <label className="form-label">User ID</label>
                <input type="text" className="form-input" defaultValue={editingFlux?.user_id || 1} readOnly />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-border rounded-lg">
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingFlux ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionFlux;
