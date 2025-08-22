import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthInfo.jsx';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    console.log('PrivateRoute user:', user); // Add this line

    if (user) {
        return children;
    }

    return <Navigate to="/signing" state={{ from: location }} replace />;
};

export default PrivateRoute;