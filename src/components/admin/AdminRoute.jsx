import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useAuth();
    const ADMIN_EMAIL = 'mianshaheerahmed@gmail.com';

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    // Check strict email or role 'admin'
    if (!user || (user.email !== ADMIN_EMAIL && user.role !== 'admin')) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
