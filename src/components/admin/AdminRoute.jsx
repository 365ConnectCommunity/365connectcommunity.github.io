import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
    }

    // Access Logic:
    // 1. Super Admin Email always allowed
    // 2. 'admin' role allowed
    // 3. 'contributor' role allowed
    const isSuperAdmin = user?.email === 'mianshaheerahmed@gmail.com';
    const isRoleBasedAdmin = user?.role === 'admin';
    const isContributor = user?.role === 'contributor';

    if (isSuperAdmin || isRoleBasedAdmin || isContributor) {
        return <Outlet />;
    }

    return <Navigate to="/" replace />;
};

export default AdminRoute;
