import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Plane, 
  PlaneLanding, 
  PlaneTakeoff,
  LogIn,
  BarChart3,
  Settings,
  User,
  Building2,
  Shield,
  Briefcase,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/register', label: 'Register', icon: UserPlus },
  { path: '/users', label: 'Liste des Utilisateurs', icon: Users },
  { path: '/gestion-users', label: 'Gestion Users', icon: Users },
  { path: '/admin-gestion-users', label: 'Admin Users', icon: Shield },
  { path: '/admin-audit', label: 'Audit & Historique', icon: Activity },
  { path: '/gestion-flux', label: 'Gestion Flux', icon: Activity },
  { path: '/arrivee', label: 'Arrivée', icon: PlaneLanding },
  { path: '/depart', label: 'Départ', icon: PlaneTakeoff },
  { path: '/compagnies', label: 'Compagnies', icon: Building2 },
  { path: '/vols', label: 'Vols', icon: Plane },
  { path: '/vols-par-compagnie', label: 'Vols par Compagnie', icon: Plane },
  { path: '/roles', label: 'Roles', icon: Shield },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/login', label: 'Login/Logout', icon: LogIn },
  { path: '/statistiques', label: 'Statistiques', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/profile', label: 'Mon Profile', icon: User },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  // const { user, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-card shadow-lg transition-all duration-300 overflow-hidden fixed h-full z-40`}
      >
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center">
            <Plane className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-foreground">Flux Migratoire</h1>
            <p className="text-xs text-muted-foreground">Gestion Aéroport</p>
          </div>
        </div>
        
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="pl-10 pr-4 py-2 w-80 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center text-white font-bold">
                  {/* {user?.prenom?.[0] || 'U'} */}
                </div>
                <div className="hidden md:block">
                  {/* <p className="text-sm font-medium text-foreground">
                    {user ? `${user.prenom} ${user.nom}` : 'Utilisateur'}
                  </p> */}
                  {/* <p className="text-xs text-muted-foreground">{user?.role || 'Invité'}</p> */}
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
