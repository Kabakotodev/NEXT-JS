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

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

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
                <CustomLink to="/services" label="Nos Services" />
                <CustomLink to="/faq" label="FAQ" />
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

            {user && user.role === "ADMIN" && (
              <>
                <CustomLink to="/admin/dashboard" label="Dashboard Admin" />
                <CustomLink to="/admin/users" label="Gestion utilisateurs" />
              </>
            )}

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
                    <User className="w-4 h-4" />
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
                        <Link to="/admin/users" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Gestion utilisateurs
                        </Link>
                      </DropdownMenuItem>

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
                  <CustomLink to="/services" label="Nos Services" />
                  <CustomLink to="/faq" label="FAQ" />
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
                  <CustomLink to="/admin/users" label="Gestion utilisateurs" />
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