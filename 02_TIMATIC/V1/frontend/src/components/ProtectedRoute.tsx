import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  role?: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useAuth();

  // ❌ Pas connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Mauvais rôle
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ Autorisé
  return children;
};

export default ProtectedRoute;