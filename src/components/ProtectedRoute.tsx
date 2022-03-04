import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { IProps } from "../utils/types";

export function ProtectedRoute({ children }: IProps) {
  const { user, loading } = useAuth();

  if (loading) return <h1>loading</h1>;

  if (!user) return <Navigate to={"/login"} />;

  return <>{children}</>;
}
