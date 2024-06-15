import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== role) {
            return <Navigate to="/courses" replace />;
        }
    } catch (error) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
