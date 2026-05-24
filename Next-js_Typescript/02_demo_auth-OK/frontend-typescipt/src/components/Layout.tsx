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

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/change-password', label: 'Changer Mot de Passe', icon: Users },
    { path: '/gestion-flux', label: 'Gestion Flux', icon: Activity },
    { path: '/arrivee', label: 'Arrivée', icon: PlaneLanding },
    { path: '/depart', label: 'Départ', icon: PlaneTakeoff },
    { path: '/compagnies', label: 'Compagnies', icon: Building2 },
    { path: '/vols', label: 'Vols', icon: Plane },
    { path: '/vols-par-compagnie', label: 'Vols par Compagnie', icon: Plane },
    { path: '/statistiques', label: 'Statistiques', icon: BarChart3 },
    { path: '/profile', label: 'Mon Profil', icon: User },
  ];

  const adminItems = [
    { path: '/users', label: 'Liste Utilisateurs', icon: Users },
    { path: '/roles', label: 'Roles', icon: Shield },
    { path: '/services', label: 'Services', icon: Briefcase },
    { path: '/admin-audit-logs', label: 'Audit & Historique', icon: Activity },
    { path: '/admin-audit-action-users', label: 'Audit Actions Utilisateurs', icon: Activity },
    { path: '/gestion-users', label: 'Gestion Utilisateurs', icon: UserPlus },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-card shadow-lg transition-all duration-300 overflow-hidden fixed h-full z-40`}>
        
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <h1 className="font-bold text-lg">Flux Migratoire</h1>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">

          {/* MENUS GENERAUX */}
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}>
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* MENUS ADMIN */}
          {user?.role === "ADMIN" && (
            <>
              <div className="mt-6 text-xs font-semibold text-muted-foreground uppercase">
                Administration
              </div>

              {adminItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link key={item.path} to={item.path}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}>
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </>
          )}

        </nav>
      </aside>

      {/* Main */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        
        {/* Header */}
        <header className="bg-card shadow-sm border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-3">

            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X /> : <Menu />}
            </button>

            {/* USER INFO */}
            <div className="flex items-center gap-4">

              <div className="text-right">
                <p className="text-sm font-semibold">
                  {user?.prenom} {user?.nom}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.username} | {user?.role}
                </p>
              </div>

              <div
                onClick={logout}
                className="cursor-pointer text-red-500 text-sm hover:underline"
              >
                Déconnexion
              </div>

            </div>

          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
