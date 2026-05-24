import { useState, useEffect } from 'react';
import { Search, Trash2, Plane, Building2 } from 'lucide-react';

interface Vol {
  id: number;
  codeVol: string;
  descVol: string;
  provenanceDestination: string;
  zone: 'ARRIVEE' | 'DEPART';
  compagnie_id: number;
}

interface Compagnie {
  id: number;
  nomCompagnie: string;
  sigleCompagnie: string;
  vols: Vol[];
}

const VolsParCompagnie = () => {
  const [compagnies, setCompagnies] = useState<Compagnie[]>([]);
  const [filteredCompagnies, setFilteredCompagnies] = useState<Compagnie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [expandedCompagnies, setExpandedCompagnies] = useState<number[]>([]);

  useEffect(() => {
    const mockData: Compagnie[] = [
      {
        id: 1,
        nomCompagnie: 'Air France',
        sigleCompagnie: 'AF',
        vols: [
          { id: 1, codeVol: 'AF1234', descVol: 'Paris-Dakar', provenanceDestination: 'Paris CDG', zone: 'ARRIVEE', compagnie_id: 1 },
          { id: 4, codeVol: 'AF4321', descVol: 'Dakar-Paris', provenanceDestination: 'Paris CDG', zone: 'DEPART', compagnie_id: 1 },
          { id: 7, codeVol: 'AF7890', descVol: 'Lyon-Dakar', provenanceDestination: 'Lyon', zone: 'ARRIVEE', compagnie_id: 1 },
        ]
      },
      {
        id: 2,
        nomCompagnie: 'Turkish Airlines',
        sigleCompagnie: 'TK',
        vols: [
          { id: 2, codeVol: 'TK5678', descVol: 'Istanbul-Dakar', provenanceDestination: 'Istanbul', zone: 'ARRIVEE', compagnie_id: 2 },
          { id: 5, codeVol: 'TK8765', descVol: 'Dakar-Istanbul', provenanceDestination: 'Istanbul', zone: 'DEPART', compagnie_id: 2 },
        ]
      },
      {
        id: 3,
        nomCompagnie: 'Emirates',
        sigleCompagnie: 'EK',
        vols: [
          { id: 3, codeVol: 'EK9012', descVol: 'Dubai-Dakar', provenanceDestination: 'Dubai', zone: 'ARRIVEE', compagnie_id: 3 },
          { id: 6, codeVol: 'EK2109', descVol: 'Dakar-Dubai', provenanceDestination: 'Dubai', zone: 'DEPART', compagnie_id: 3 },
        ]
      },
    ];
    setCompagnies(mockData);
    setFilteredCompagnies(mockData);
    setExpandedCompagnies(mockData.map(c => c.id));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const result = compagnies.map(c => ({
        ...c,
        vols: c.vols.filter(v => 
          Object.values(v).some(val => 
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
          ) || c.nomCompagnie.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(c => c.vols.length > 0 || c.nomCompagnie.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredCompagnies(result);
    } else {
      setFilteredCompagnies(compagnies);
    }
  }, [searchTerm, compagnies]);

  const totalVols = filteredCompagnies.reduce((sum, c) => sum + c.vols.length, 0);

  const toggleExpand = (id: number) => {
    setExpandedCompagnies(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectVol = (volId: number) => {
    setSelectedItems(prev => 
      prev.includes(volId) ? prev.filter(i => i !== volId) : [...prev, volId]
    );
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Supprimer ${selectedItems.length} vol(s)?`)) {
      setCompagnies(compagnies.map(c => ({
        ...c,
        vols: c.vols.filter(v => !selectedItems.includes(v.id))
      })));
      setSelectedItems([]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary" />
          <h1 className="page-title">Vols par Compagnie</h1>
          <span className="badge badge-primary text-sm px-3 py-1">
            {totalVols} vol(s)
          </span>
        </div>
        {selectedItems.length > 0 && (
          <button onClick={handleDeleteSelected} className="btn-danger flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Supprimer ({selectedItems.length})
          </button>
        )}
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

      {/* Compagnies with their vols */}
      <div className="space-y-4">
        {filteredCompagnies.map((compagnie) => (
          <div key={compagnie.id} className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer"
              onClick={() => toggleExpand(compagnie.id)}
            >
              <div className="flex items-center gap-3">
                <Plane className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-heading font-semibold">{compagnie.nomCompagnie}</h3>
                  <span className="text-sm text-muted-foreground">Code: {compagnie.sigleCompagnie}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge badge-primary">{compagnie.vols.length} vol(s)</span>
                <span className={`transform transition-transform ${expandedCompagnies.includes(compagnie.id) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
            </div>

            {expandedCompagnies.includes(compagnie.id) && (
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        <input 
                          type="checkbox"
                          checked={compagnie.vols.every(v => selectedItems.includes(v.id))}
                          onChange={() => {
                            const allSelected = compagnie.vols.every(v => selectedItems.includes(v.id));
                            if (allSelected) {
                              setSelectedItems(prev => prev.filter(id => !compagnie.vols.some(v => v.id === id)));
                            } else {
                              setSelectedItems(prev => [...prev, ...compagnie.vols.map(v => v.id).filter(id => !prev.includes(id))]);
                            }
                          }}
                          className="w-4 h-4 rounded"
                        />
                      </th>
                      <th>Code Vol</th>
                      <th>Description</th>
                      <th>Provenance/Destination</th>
                      <th>Zone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compagnie.vols.map((vol) => (
                      <tr key={vol.id}>
                        <td>
                          <input 
                            type="checkbox"
                            checked={selectedItems.includes(vol.id)}
                            onChange={() => toggleSelectVol(vol.id)}
                            className="w-4 h-4 rounded"
                          />
                        </td>
                        <td><span className="font-medium">{vol.codeVol}</span></td>
                        <td>{vol.descVol}</td>
                        <td>{vol.provenanceDestination}</td>
                        <td>
                          <span className={`badge ${vol.zone === 'ARRIVEE' ? 'badge-success' : 'badge-primary'}`}>
                            {vol.zone}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolsParCompagnie;
