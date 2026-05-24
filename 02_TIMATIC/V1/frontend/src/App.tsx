import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Categorie from "./pages/Categorie";
import Document from "./pages/Document";

// ✅ React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nationalite from "./pages/Nationalite";
import Regime from "./pages/Regime";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminGestionUsers from "./pages/AdminGestionUsers";
import NosServices from "./pages/NosServices";

import Role from "./pages/Role";
import ServiceParent from "./pages/ServiceParent";
import Service from "./pages/Services";
import Personnel from "./pages/Personnel";
import ServiceParServiceParent from "./pages/ServiceParServiceParent";
import ServiceParServiceParent2 from "./pages/ServiceParServiceParent2";
import Personnel2 from "./pages/Personnel2";
import PersonnelParService from "./pages/PersonnelParService";
import PersonnelParService2 from "./pages/PersonnelParService2";
import PersonnelProfil from "./pages/PersonnelProfil";
import PersonnelParService3 from "./pages/PersonnelParService3";
import TOP5PersonnelParService from "./pages/TOP5PersonnelParService";
import TOP10PersonnelParService from "./pages/TOP10PersonnelParService";
import TOP10PersonnelParService2 from "./pages/TOP10PersonnelParService2";
import Actualites from "./pages/Actualites";
import ArticleDetail from "./pages/ArticleDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* ✅ AJOUT ICI */}
        <TooltipProvider>
          <BrowserRouter>
            
            <Routes>

              {/* 🔓 PUBLIC (non connecté seulement) */}
              <Route path="/" element={<Index />} />
              <Route path="/nos-services" element={<NosServices />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/actualites" element={<Actualites />} />
              <Route path="/actualites/:id" element={<ArticleDetail />} />

              {/* 🔐 CONNECTÉS (tous rôles) */}
              <Route
                path="/documents"
                element={
                  <ProtectedRoute>
                    <Document />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <Categorie />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/nationalites"
                element={
                  <ProtectedRoute>
                    <Nationalite />
                  </ProtectedRoute>
                }
              />

              {/* 🔐 ADMIN UNIQUEMENT */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute role="ADMIN">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <ProtectedRoute role="ADMIN">
                    <Register />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/roles"
                element={
                  <ProtectedRoute role="ADMIN">
                    <Role />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/service-parent"
                element={
                  <ProtectedRoute role="ADMIN">
                    <ServiceParent />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute role="ADMIN">
                    <Service />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/services_par_parents1"
                element={
                  <ProtectedRoute role="ADMIN">
                    <ServiceParServiceParent />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/services_par_parents2"
                element={
                  <ProtectedRoute role="ADMIN">
                    <ServiceParServiceParent2 />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute role="ADMIN">
                    <AdminGestionUsers />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/personnels"
                element={
                  <ProtectedRoute role="ADMIN">
                    <Personnel />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/personnels2"
                element={
                  <ProtectedRoute role="ADMIN">
                    <Personnel2 />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/personnel_par_service"
                element={
                  <ProtectedRoute role="ADMIN">
                    <PersonnelParService />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/personnel_par_service2"
                element={
                  <ProtectedRoute role="ADMIN">
                    <PersonnelParService2 />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/personnel_par_service3"
                element={
                  <ProtectedRoute role="ADMIN">
                    <PersonnelParService3 />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/top5_personnel_par_service"
                element={
                  <ProtectedRoute role="ADMIN">
                    <TOP5PersonnelParService />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/top10_personnel_par_service"
                element={
                  <ProtectedRoute role="ADMIN">
                    <TOP10PersonnelParService />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/top10_personnel_par_service2"
                element={
                  <ProtectedRoute role="ADMIN">
                    <TOP10PersonnelParService2 />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/personnel/:id"
                element={
                  <ProtectedRoute role="ADMIN">
                    <PersonnelProfil />
                  </ProtectedRoute>
                }
              />

              {/* <Route path="/personnel/:id" element={<PersonnelProfil/>}/> */}

              <Route path="*" element={<NotFound />} />

            </Routes>

          </BrowserRouter>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </TooltipProvider>
      </AuthProvider> {/* ✅ AJOUT ICI */}
    </QueryClientProvider>
  );
};
export default App;