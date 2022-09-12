import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext/AuthContext";

interface AuthContextProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: AuthContextProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return children;
};
