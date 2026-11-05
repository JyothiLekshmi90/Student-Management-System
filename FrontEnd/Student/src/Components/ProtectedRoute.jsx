import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// allowedRoles expects strings matching your form inputs: e.g., ["Teacher"] or ["Student"]
function ProtectedRoute({ allowedRoles }) {
  // Grab the real-time auth values directly from your Redux state pipeline
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // 1. If the user is not authenticated at all, kick them back to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. If the user is logged in, but their role isn't in the list of allowed roles for this route
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Success: Let them view the page
  return <Outlet />;
}

export default ProtectedRoute;
