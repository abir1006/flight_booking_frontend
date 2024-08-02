import { Outlet, Navigate } from 'react-router-dom'
import {useSelector} from "react-redux";

const PrivateRoute = ({ children, roles }) => {

    const auth = useSelector((state) => state.auth);

    if (!auth.isAuthenticated) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }

    if (roles && roles.length > 0 && !roles.includes(auth?.user?.role)) {
        // If the user does not have the required role, redirect to an unauthorized page
        return <Navigate to="/unauthorized" />;
    }

    // If the user is authenticated and has the required role, render the child component
    return children;
}

export default PrivateRoute