import { BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area } from 'recharts';

const monthlyData = [
  { name: 'Jan', arrivee: 45000, depart: 38000 },
  { name: 'Fév', arrivee: 52000, depart: 42000 },
  { name: 'Mar', arrivee: 48000, depart: 45000 },
  { name: 'Avr', arrivee: 61000, depart: 55000 },
  { name: 'Mai', arrivee: 55000, depart: 52000 },
  { name: 'Jun', arrivee: 67000, depart: 61000 },
  { name: 'Jul', arrivee: 72000, depart: 68000 },
  { name: 'Aoû', arrivee: 78000, depart: 72000 },
  { name: 'Sep', arrivee: 58000, depart: 54000 },
  { name: 'Oct', arrivee: 62000, depart: 58000 },
  { name: 'Nov', arrivee: 54000, depart: 50000 },
  { name: 'Déc', arrivee: 68000, depart: 65000 },
];

const compagnieData = [
  { name: 'Air France', value: 35, color: '#3B82F6' },
  { name: 'Turkish Airlines', value: 25, color: '#EF4444' },
  { name: 'Emirates', value: 20, color: '#F59E0B' },
  { name: 'Lufthansa', value: 12, color: '#10B981' },
  { name: 'Autres', value: 8, color: '#8B5CF6' },
];

const zoneData = [
  { name: 'Arrivée', value: 629000, color: '#10B981' },
  { name: 'Départ', value: 518800, color: '#3B82F6' },
  { name: 'Transit', value: 125000, color: '#F59E0B' },
];

const periodeData = [
  { name: 'Matin', paxSn: 320000, paxAutre: 180000 },
  { name: 'Après-midi', paxSn: 280000, paxAutre: 220000 },
];

const Statistiques = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h1 className="page-title">Statistiques</h1>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Arrivées (Année)</p>
          <p className="text-2xl font-bold text-green-600">720,000</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Total Départs (Année)</p>
          <p className="text-2xl font-bold text-blue-600">660,000</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Pax SN</p>
          <p className="text-2xl font-bold text-purple-600">850,000</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground">Pax Autres</p>
          <p className="text-2xl font-bold text-orange-600">530,000</p>
        </div>
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly flux */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">Flux Mensuel (Arrivées vs Départs)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="arrivee" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Arrivées" />
              <Area type="monotone" dataKey="depart" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Départs" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* By compagnie */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">Répartition par Compagnie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={compagnieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {compagnieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By zone */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">Répartition par Zone</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={zoneData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {zoneData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By periode */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">Flux par Période</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={periodeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="paxSn" fill="#10B981" name="Pax SN" radius={[4, 4, 0, 0]} />
              <Bar dataKey="paxAutre" fill="#3B82F6" name="Pax Autre" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend line */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <h3 className="font-heading font-semibold text-lg mb-6">Tendance Annuelle</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="arrivee" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} name="Arrivées" />
            <Line type="monotone" dataKey="depart" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} name="Départs" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistiques;
