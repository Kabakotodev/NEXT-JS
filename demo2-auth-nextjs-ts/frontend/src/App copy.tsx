import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import GestionUsers from "./pages/GestionUsers";
import GestionFlux from "./pages/GestionFlux";
import Compagnies from "./pages/Compagnies";
import VolsParCompagnie from "./pages/VolsParCompagnie";
import Roles from "./pages/Roles";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Arrivee from "./pages/Arrivee";
import Depart from "./pages/Depart";
import AdminGestionUsers from "./pages/AdminGestionUsers";
import AdminAuditUser from "./pages/AdminAuditUser";
import UserChangePassword from "./pages/UserChangePassword";
import Statistiques from "./pages/Statistiques";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Vols from "./pages/Vols";
import UsersPage from "./pages/UsersPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  
  return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      
      {/* ACCESSIBLE PAR TOUT LE MONDE MEME LES UTILISATEURS NON CONNECTES */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      {/* ACCESSIBLE UNIQUEMENT PAR LES ADMIN */}

      <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
      <Route path="/gestion-users" element={<ProtectedRoute><GestionUsers /></ProtectedRoute>} />
      
      <Route path="/admin-gestion-users" element={<ProtectedRoute><AdminGestionUsers /></ProtectedRoute>} />
      <Route path="/admin-audit" element={<ProtectedRoute><AdminAuditUser /></ProtectedRoute>} />

      {/* ACCESSIBLE PAR TOUT UTILISATEUR CONNECTE */}
      <Route path="/gestion-flux" element={<ProtectedRoute><GestionFlux /></ProtectedRoute>} />
      <Route path="/compagnies" element={<ProtectedRoute><Compagnies /></ProtectedRoute>} />
      <Route path="/vols" element={<ProtectedRoute><Vols /></ProtectedRoute>} />
      <Route path="/vols-par-compagnie" element={<ProtectedRoute><VolsParCompagnie /></ProtectedRoute>} />
      <Route path="/roles" element={<ProtectedRoute><Roles /></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
      <Route path="/arrivee" element={<ProtectedRoute><Arrivee /></ProtectedRoute>} />
      <Route path="/depart" element={<ProtectedRoute><Depart /></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute><UserChangePassword /></ProtectedRoute>} />
      <Route path="/statistiques" element={<ProtectedRoute><Statistiques /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
