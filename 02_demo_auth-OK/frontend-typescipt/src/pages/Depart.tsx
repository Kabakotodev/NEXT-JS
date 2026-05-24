import { useState, useEffect } from 'react';
import { PlaneTakeoff, Search } from 'lucide-react';

interface FluxDepart {
  id: number;
  dateFlux: string;
  codeVol: string;
  nbrePaxSn: number;
  nbrePaxAutre: number;
  periode: string;
  destination: string;
  compagnie: string;
}

const Depart = () => {
  const [flux, setFlux] = useState<FluxDepart[]>([]);
  const [filteredFlux, setFilteredFlux] = useState<FluxDepart[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const mockData: FluxDepart[] = [
      { id: 1, dateFlux: '2024-01-15T10:00:00', codeVol: 'AF4321', nbrePaxSn: 95, nbrePaxAutre: 80, periode: 'MATIN', destination: 'Paris CDG', compagnie: 'Air France' },
      { id: 2, dateFlux: '2024-01-15T11:30:00', codeVol: 'TK8765', nbrePaxSn: 110, nbrePaxAutre: 90, periode: 'MATIN', destination: 'Istanbul', compagnie: 'Turkish Airlines' },
      { id: 3, dateFlux: '2024-01-15T15:00:00', codeVol: 'EK2109', nbrePaxSn: 180, nbrePaxAutre: 140, periode: 'APRES MIDI', destination: 'Dubai', compagnie: 'Emirates' },
      { id: 4, dateFlux: '2024-01-15T17:30:00', codeVol: 'LH2468', nbrePaxSn: 75, nbrePaxAutre: 95, periode: 'APRES MIDI', destination: 'Frankfurt', compagnie: 'Lufthansa' },
    ];
    setFlux(mockData);
    setFilteredFlux(mockData);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const result = flux.filter(f => 
        Object.values(f).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredFlux(result);
    } else {
      setFilteredFlux(flux);
    }
  }, [searchTerm, flux]);

  const paginatedData = filteredFlux.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredFlux.length / itemsPerPage);
  const totalPaxSn = filteredFlux.reduce((sum, f) => sum + f.nbrePaxSn, 0);
  const totalPaxAutre = filteredFlux.reduce((sum, f) => sum + f.nbrePaxAutre, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <PlaneTakeoff className="w-8 h-8 text-blue-500" />
          <h1 className="page-title">Flux des Départs</h1>
          <span className="badge badge-primary text-sm px-3 py-1">
            {filteredFlux.length} enregistrement(s)
          </span>
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
                <th>Date/Heure</th>
                <th>Code Vol</th>
                <th>Destination</th>
                <th>Compagnie</th>
                <th>Pax SN</th>
                <th>Pax Autre</th>
                <th>Période</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((f) => (
                <tr key={f.id}>
                  <td>{new Date(f.dateFlux).toLocaleString('fr-FR')}</td>
                  <td><span className="font-medium">{f.codeVol}</span></td>
                  <td>{f.destination}</td>
                  <td>{f.compagnie}</td>
                  <td className="text-green-600 font-medium">{f.nbrePaxSn}</td>
                  <td className="text-blue-600 font-medium">{f.nbrePaxAutre}</td>
                  <td>
                    <span className={`badge ${f.periode === 'MATIN' ? 'badge-warning' : 'badge-primary'}`}>
                      {f.periode}
                    </span>
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
                Total: <strong>{totalPaxSn + totalPaxAutre}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
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
              <span className="text-sm">{currentPage} / {totalPages || 1}</span>
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
    </div>
  );
};

export default Depart;
