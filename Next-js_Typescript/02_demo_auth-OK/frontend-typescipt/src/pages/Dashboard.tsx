import { Users, Calendar, Building, TrendingUp, PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import airportBg from '../assets/airport-background.jpg';

const statsCards = [
  {
    title: 'Flux du Jour',
    subtitle: 'Arrivée / Départ',
    value: '700 / 800',
    icon: Users,
    colorClass: 'stat-card-blue',
  },
  {
    title: 'Flux de la semaine',
    subtitle: 'Arrivée / Départ',
    value: '29000 / 18800',
    icon: Building,
    colorClass: 'stat-card-orange',
  },
  {
    title: 'Flux du mois',
    subtitle: 'Arrivée / Départ',
    value: '629000 / 518800',
    icon: TrendingUp,
    colorClass: 'stat-card-red',
  },
  {
    title: "Flux dans l'Année",
    subtitle: 'Arrivée / Départ',
    value: '1900000 / 2880000',
    icon: Calendar,
    colorClass: 'stat-card-green',
  },
];

const pieData = [
  { name: 'Janvier', value: 44, color: '#8B5CF6' },
  { name: 'Février', value: 32, color: '#F97316' },
  { name: 'Mars', value: 16, color: '#22C55E' },
  { name: 'Avril', value: 8, color: '#06B6D4' },
];

const barData = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 180 },
  { name: 'Mar', value: 150 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 175 },
  { name: 'Jun', value: 190 },
  { name: 'Jul', value: 210 },
  { name: 'Aug', value: 185 },
  { name: 'Sep', value: 160 },
  { name: 'Oct', value: 195 },
  { name: 'Nov', value: 140 },
  { name: 'Dec', value: 170 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero section with background */}
      <div 
        className="relative rounded-2xl overflow-hidden h-48 mb-8"
        style={{ 
          backgroundImage: `url(${airportBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
        <div className="relative z-10 p-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-heading font-bold text-white mb-2">
            Bienvenue sur le Dashboard
          </h1>
          <p className="text-white/90 max-w-xl">
            Gestion du flux migratoire - Suivi en temps réel des arrivées et départs
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className={`stat-card ${card.colorClass}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-heading font-semibold text-lg">{card.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{card.subtitle}</p>
                  <p className="text-2xl font-bold mt-3">{card.value}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-7 h-7" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">GRAPHE FLUX PAR MOIS</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">TOTAL FLUX PAR MOIS</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arrivées récentes */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <PlaneLanding className="w-6 h-6 text-green-500" />
            <h3 className="font-heading font-semibold text-lg">Arrivées Récentes</h3>
          </div>
          <div className="space-y-3">
            {[
              { vol: 'AF 1234', origine: 'Paris CDG', heure: '14:30', pax: 156 },
              { vol: 'TK 5678', origine: 'Istanbul', heure: '15:45', pax: 203 },
              { vol: 'EK 9012', origine: 'Dubai', heure: '16:00', pax: 312 },
            ].map((flight, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{flight.vol}</p>
                  <p className="text-sm text-muted-foreground">{flight.origine}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{flight.heure}</p>
                  <p className="text-sm text-muted-foreground">{flight.pax} Pax</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Départs récents */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <PlaneTakeoff className="w-6 h-6 text-blue-500" />
            <h3 className="font-heading font-semibold text-lg">Départs Récents</h3>
          </div>
          <div className="space-y-3">
            {[
              { vol: 'AF 4321', destination: 'Paris CDG', heure: '17:00', pax: 178 },
              { vol: 'TK 8765', destination: 'Istanbul', heure: '18:15', pax: 195 },
              { vol: 'EK 2109', destination: 'Dubai', heure: '19:30', pax: 287 },
            ].map((flight, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{flight.vol}</p>
                  <p className="text-sm text-muted-foreground">{flight.destination}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{flight.heure}</p>
                  <p className="text-sm text-muted-foreground">{flight.pax} Pax</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
