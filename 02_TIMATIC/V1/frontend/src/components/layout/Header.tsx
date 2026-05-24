import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Globe, User, LogOut, LayoutDashboard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
//
export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  //
  const getInitials = (prenom?: string, nom?: string) => {
  const p = prenom?.charAt(0).toUpperCase() || "";
  const n = nom?.charAt(0).toUpperCase() || "";
  return `${p}${n}`;
};
//

  const CustomLink = ({ to, label }: { to: string; label: string }) => (
    <Link
      to={to}
      onClick={() => setIsMobileMenuOpen(false)}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
        location.pathname === to
          ? "text-primary bg-primary/5"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-institutional flex items-center justify-center shadow-md">
              <Globe className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-lg lg:text-xl font-semibold text-foreground leading-tight">
                Immigration Sénégal
              </p>
              <p className="text-xs text-muted-foreground">
                Portail officiel d'information
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">

            {!user && (
              <>
                <CustomLink to="/" label="Accueil" />
                <CustomLink to="/dashboard" label="Dashboard" />
                <CustomLink to="/nos-services" label="Nos Services" />
                {/* <CustomLink to="/faq" label="FAQ" /> */}
                <CustomLink to="/about" label="Qui sommes-nous" />
                <CustomLink to="/contact" label="Contact" />
              </>
            )}

            {user && (
              <>
                <CustomLink to="/documents" label="Documents" />
                <CustomLink to="/categories" label="Catégories" />
                <CustomLink to="/nationalites" label="Nationalités" />
              </>
            )}

            {/* {user && user.role === "ADMIN" && (
              <>
                <CustomLink to="/register" label="Register" />
                <CustomLink to="/admin/dashboard" label="Dashboard Admin" />
                <CustomLink to="/admin/roles" label="Gestion Roles" />
                <CustomLink to="/admin/services" label="Gestion Services" />
                <CustomLink to="/admin/users" label="Gestion Users" />
              </>
            )} */}

          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {!user && (
              <Button variant="hero" size="sm" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
            )}

            {user && (
              <DropdownMenu>

                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    {/* <User className="w-4 h-4" /> */}
                    {/* Un avatar rond avec les initiales  */}
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">

                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-white text-xs">
                            {getInitials(user.prenom, user.nom)}
                          </AvatarFallback>
                        </Avatar>

                        {/* <span className="hidden md:inline">
                          {user.prenom}
                        </span> */}

                      </Button>
                    </DropdownMenuTrigger>
                    {/* Fin avatar rond avec les initiales */}

                    <span className="hidden md:inline">
                      {user.prenom} {user.nom}
                      
                    </span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">

                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {user.prenom} {user.nom}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user.role}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {user.role === "ADMIN" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/register" className="flex items-center gap-2">
                          <LayoutDashboard className="w-4 h-4" />
                          Register
                        </Link>
                      </DropdownMenuItem>

                      {/* <DropdownMenuItem asChild>
                        <Link to="/admin/roles" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Gestion Roles
                        </Link>
                      </DropdownMenuItem> */}

                      {/* <DropdownMenuItem asChild>
                        <Link to="/admin/service-parent" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Gestion Services Parents
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/admin/services" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Gestion Services
                        </Link>
                      </DropdownMenuItem> */}

                      {/* <DropdownMenuItem asChild>
                        <Link to="/admin/services_par_parents1" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Gestion Services vs Parents 1
                        </Link>
                      </DropdownMenuItem> */}

                      <DropdownMenuItem asChild>
                        <Link to="/admin/services_par_parents2" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Gestion Services vs Parents 2
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/admin/users" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Gestion utilisateurs
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/admin/personnels" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Gestion Personnels
                        </Link>
                      </DropdownMenuItem>

                      {/* <DropdownMenuItem asChild>
                        <Link to="/admin/personnels2" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Gestion Personnels 2
                        </Link>
                      </DropdownMenuItem> */}

                      <DropdownMenuItem asChild>
                        <Link to="/admin/personnel_par_service" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Personnels Par Service
                        </Link>
                      </DropdownMenuItem>

                      {/* <DropdownMenuItem asChild>
                        <Link to="/admin/personnel_par_service2" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Personnels Par Service 2
                        </Link>
                      </DropdownMenuItem> */}

                      {/* <DropdownMenuItem asChild>
                        <Link to="/admin/personnel_par_service3" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Personnels Par Service 3
                        </Link>
                      </DropdownMenuItem> */}

                      {/* <DropdownMenuItem asChild>
                        <Link to="/admin/top5_personnel_par_service" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          TOP5 Personnels Par Service
                        </Link>
                      </DropdownMenuItem> */}

                      <DropdownMenuItem asChild>
                        <Link to="/admin/top10_personnel_par_service" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          TOP10 Personnels Par Service
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link to="/admin/top10_personnel_par_service2" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          TOP10 Personnels Par Service 2
                        </Link>
                      </DropdownMenuItem>

                      {/* <DropdownMenuItem asChild>
                        <Link to="/admin/personnel_profil" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Personnels Profil
                        </Link>
                      </DropdownMenuItem> */}

                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>

                </DropdownMenuContent>

              </DropdownMenu>
            )}

            {/* Mobile menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">

              {!user && (
                <>
                  <CustomLink to="/" label="Accueil" />
                  <CustomLink to="/nos-services" label="Nos Services" />
                  {/* <CustomLink to="/faq" label="FAQ" /> */}
                  <CustomLink to="/about" label="Qui sommes-nous" />
                  <CustomLink to="/contact" label="Contact" />
                  <CustomLink to="/login" label="Connexion" />
                </>
              )}

              {user && (
                <>
                  <CustomLink to="/documents" label="Documents" />
                  <CustomLink to="/categories" label="Catégories" />
                  <CustomLink to="/nationalites" label="Nationalités" />
                </>
              )}

              {user && user.role === "ADMIN" && (
                <>
                  <CustomLink to="/admin/dashboard" label="Dashboard Admin" />
                  <CustomLink to="/register" label="Register" />
                  <CustomLink to="/admin/roles" label="Gestion Roles" />
                  <CustomLink to="/admin/services" label="Gestion Services" />
                  <CustomLink to="/admin/users" label="Gestion Users" />
                </>
              )}

            </div>
          </nav>
        )}

      </div>
    </header>
  );
};

export default Header;