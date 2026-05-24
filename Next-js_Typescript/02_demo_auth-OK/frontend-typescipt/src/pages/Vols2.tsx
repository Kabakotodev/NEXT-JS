import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Plane } from 'lucide-react';

interface Vol {
  id: number;
  codeVol: string;
  descVol: string;
  provenanceDestination: string;
  zone: 'ARRIVEE' | 'DEPART';
  compagnie_id: number;
  compagnie?: { nomCompagnie: string };
}

const Vols = () => {
  const [vols, setVols] = useState<Vol[]>([]);
  const [filteredVols, setFilteredVols] = useState<Vol[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingVol, setEditingVol] = useState<Vol | null>(null);
  const [compagnies, setCompagnies] = useState<any[]>([]);

  useEffect(() => {
    const mockVols: Vol[] = [
      { id: 1, codeVol: 'AF1234', descVol: 'Vol Paris-Dakar', provenanceDestination: 'Paris CDG', zone: 'ARRIVEE', compagnie_id: 1, compagnie: { nomCompagnie: 'Air France' } },
      { id: 2, codeVol: 'TK5678', descVol: 'Vol Istanbul-Dakar', provenanceDestination: 'Istanbul', zone: 'ARRIVEE', compagnie_id: 2, compagnie: { nomCompagnie: 'Turkish Airlines' } },
      { id: 3, codeVol: 'EK9012', descVol: 'Vol Dubai-Dakar', provenanceDestination: 'Dubai', zone: 'ARRIVEE', compagnie_id: 3, compagnie: { nomCompagnie: 'Emirates' } },
      { id: 4, codeVol: 'AF4321', descVol: 'Vol Dakar-Paris', provenanceDestination: 'Paris CDG', zone: 'DEPART', compagnie_id: 1, compagnie: { nomCompagnie: 'Air France' } },
      { id: 5, codeVol: 'LH2468', descVol: 'Vol Dakar-Frankfurt', provenanceDestination: 'Frankfurt', zone: 'DEPART', compagnie_id: 4, compagnie: { nomCompagnie: 'Lufthansa' } },
    ];
    setVols(mockVols);
    setFilteredVols(mockVols);

    setCompagnies([
      { id: 1, nomCompagnie: 'Air France' },
      { id: 2, nomCompagnie: 'Turkish Airlines' },
      { id: 3, nomCompagnie: 'Emirates' },
      { id: 4, nomCompagnie: 'Lufthansa' },
    ]);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const result = vols.filter(v => 
        Object.values(v).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredVols(result);
    } else {
      setFilteredVols(vols);
    }
    setCurrentPage(1);
  }, [searchTerm, vols]);

  const paginatedData = filteredVols.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredVols.length / itemsPerPage);

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedData.map(v => v.id));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Supprimer ${selectedItems.length} vol(s)?`)) {
      setVols(vols.filter(v => !selectedItems.includes(v.id)));
      setSelectedItems([]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Plane className="w-8 h-8 text-primary" />
          <h1 className="page-title">Gestion des Vols</h1>
          <span className="badge badge-primary text-sm px-3 py-1">
            {filteredVols.length} vol(s)
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
            onClick={() => { setEditingVol(null); setShowModal(true); }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-4">
        <div className="relative max-w-md">
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

      {/* Table */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded"
                  />
                </th>
                <th>ID</th>
                <th>Code Vol</th>
                <th>Description</th>
                <th>Provenance/Destination</th>
                <th>Zone</th>
                <th>Compagnie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((vol) => (
                <tr key={vol.id}>
                  <td>
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(vol.id)}
                      onChange={() => {
                        setSelectedItems(prev => 
                          prev.includes(vol.id) 
                            ? prev.filter(i => i !== vol.id) 
                            : [...prev, vol.id]
                        );
                      }}
                      className="w-4 h-4 rounded"
                    />
                  </td>
                  <td>{vol.id}</td>
                  <td><span className="font-medium">{vol.codeVol}</span></td>
                  <td>{vol.descVol}</td>
                  <td>{vol.provenanceDestination}</td>
                  <td>
                    <span className={`badge ${vol.zone === 'ARRIVEE' ? 'badge-success' : 'badge-primary'}`}>
                      {vol.zone}
                    </span>
                  </td>
                  <td>{vol.compagnie?.nomCompagnie}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setEditingVol(vol); setShowModal(true); }}
                        className="p-1.5 hover:bg-muted rounded-lg text-yellow-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Supprimer ce vol?')) {
                            setVols(vols.filter(v => v.id !== vol.id));
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
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
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-border disabled:opacity-50"
            >
              Précédent
            </button>
            <span className="text-sm">{currentPage} / {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-border disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-heading font-semibold mb-4">
              {editingVol ? 'Modifier Vol' : 'Nouveau Vol'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="form-label">Code Vol</label>
                <input type="text" className="form-input" defaultValue={editingVol?.codeVol} />
              </div>
              <div>
                <label className="form-label">Description</label>
                <input type="text" className="form-input" defaultValue={editingVol?.descVol} />
              </div>
              <div>
                <label className="form-label">Provenance/Destination</label>
                <input type="text" className="form-input" defaultValue={editingVol?.provenanceDestination} />
              </div>
              <div>
                <label className="form-label">Zone</label>
                <select className="form-select" defaultValue={editingVol?.zone}>
                  <option value="">Sélectionner</option>
                  <option value="ARRIVEE">ARRIVÉE</option>
                  <option value="DEPART">DÉPART</option>
                </select>
              </div>
              <div>
                <label className="form-label">Compagnie</label>
                <select className="form-select" defaultValue={editingVol?.compagnie_id}>
                  <option value="">Sélectionner une compagnie</option>
                  {compagnies.map(c => (
                    <option key={c.id} value={c.id}>{c.nomCompagnie}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-border rounded-lg">
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  {editingVol ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vols;
