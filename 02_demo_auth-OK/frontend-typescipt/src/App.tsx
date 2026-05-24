import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
// import AdminAuditUser from "./pages/AdminAuditUser";
import UserChangePassword from "./pages/UserChangePassword";
import Statistiques from "./pages/Statistiques";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Vols from "./pages/Vols";
import UsersPage from "./pages/UsersPage";
import ChangePasswordFirstLogin from "./pages/ChangePasswordFirstLogin";
import AdminAuditLog from "./pages/AdminAuditLog";
import AdminGestionUsers from "./pages/AdminGestionUsers";
import UserDetailCard from "./pages/UserDetailCard";
import AdminAuditActionUsers from "./pages/AdminAuditActionUsers";


const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= PROTECTED ROUTES ================= */}

      {/* Accessible à tout utilisateur connecté */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gestion-flux"
        element={
          <ProtectedRoute>
            <GestionFlux />
          </ProtectedRoute>
        }
      />

      <Route
        path="/compagnies"
        element={
          <ProtectedRoute>
            <Compagnies />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vols"
        element={
          <ProtectedRoute>
            <Vols />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vols-par-compagnie"
        element={
          <ProtectedRoute>
            <VolsParCompagnie />
          </ProtectedRoute>
        }
      />

      <Route
        path="/arrivee"
        element={
          <ProtectedRoute>
            <Arrivee />
          </ProtectedRoute>
        }
      />

      <Route
        path="/depart"
        element={
          <ProtectedRoute>
            <Depart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <UserChangePassword />
          </ProtectedRoute>
        }
      />

      <Route
        path="/statistiques"
        element={
          <ProtectedRoute>
            <Statistiques />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ONLY ================= */}

      <Route path="/first-change-password" element={<ChangePasswordFirstLogin />} />

      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <UsersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gestion-users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminGestionUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/roles"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Roles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/services"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Services />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-gestion-users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminGestionUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <UserDetailCard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-audit-logs"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminAuditLog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-audit-action-users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminAuditActionUsers />
          </ProtectedRoute>
        }
      />

      {/* <Route path="/admin-audit-logs" element={<AdminAuditLog />} /> */}


      {/* ================= FALLBACK ================= */}
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
