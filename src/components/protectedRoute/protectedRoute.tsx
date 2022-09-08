import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../services/AuthContext/AuthContext";

interface AuthContextProps {
  children?: any;
}
// Если поставить ReactNode, то роут выдает ошибку в App.tsx
// Официальный ответ Microsoft по типу children
// https://github.com/Microsoft/TypeScript/issues/6471

export const ProtectedRoute = ({ children }: AuthContextProps) => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  if (!user) {
    return navigate("/login");
  }

  return children;
};
