import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const PublicOnlyRoute = ({ children }: any) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/documents" replace />;
  }

  return children;
};

export default PublicOnlyRoute;