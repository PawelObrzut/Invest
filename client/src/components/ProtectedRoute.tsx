import useAuth from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

const ProtectedRoute = ({
  children,
  fallback = null,
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <>{fallback}</>;
};

export default ProtectedRoute;
