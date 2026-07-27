
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children, role }) {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {

        // Logout pare direct login page
        if (sessionStorage.getItem("logoutSuccess")) {
            return <Navigate to="/login" replace />;
        }

        // Manually protected route access kale
        return (
            <Navigate
                to="/auth-required"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    if (role && user?.role !== role) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;