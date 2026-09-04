import { Navigate, useLocation } from "react-router";
import { useAuth, UserRole } from "../contexts/auth-context";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have the required role, redirect to their dashboard
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const dashboardPath = user.role === "student" 
      ? "/student" 
      : user.role === "instructor" 
      ? "/instructor" 
      : "/admin";
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
}
