import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading/Loading';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLading } = useUserRole();

    if (loading || roleLading) {
        return <Loading />
    }

    if (!user || role !== 'admin') {
        return <Navigate to="/forbidden" state={location.pathname}></Navigate>
    }

    return children;
};

export default AdminRoute;
//adminroute