/**
 * client/src/routes/AppRoutes.jsx
 * Definisi routing utama aplikasi menggunakan react-router-dom
 * Mengatur route untuk login, dashboard manager, dashboard staff, users, locations, inventory, dan transaksi
 * Menggunakan ProtectedRoute untuk membatasi akses berdasarkan role user
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Locations from '../pages/Locations';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Inventory from '../pages/Inventory'; // contoh page staff
import StaffDashboard from '../pages/StaffDashboard';
import Transactions from '../pages/Transactions';
import Layout from '../layout';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Router>
        <Routes>
            {/* Route untuk halaman login */}
            <Route path="/" element={<Login />} />
            {/* Route dengan layout utama */}
            <Route element={<Layout />}>
            {/* Route untuk manager */}
            <Route
                path="/dashboard"
                element={
                <ProtectedRoute requiredRole="manager">
                    <Dashboard />
                </ProtectedRoute>
                }
            />
            {/* Route untuk staff */}
            <Route
                path="/staff-dashboard"
                element={
                <ProtectedRoute requiredRole="staff">
                    <StaffDashboard />
                </ProtectedRoute>
                }
            />
            {/* Route manajemen user, hanya untuk manager */}
            <Route
                path="/users"
                element={
                <ProtectedRoute requiredRole="manager">
                    <Users />
                </ProtectedRoute>
                }
            />
            {/* Route lokasi gudang, hanya untuk manager */}
            <Route
                path="/locations"
                element={
                <ProtectedRoute requiredRole="manager">
                    <Locations />
                </ProtectedRoute>
                }
            />
            {/* Route inventaris, untuk semua role yang login */}
            <Route
                path="/inventory"
                element={
                <ProtectedRoute>
                    <Inventory />
                </ProtectedRoute>
                }
            />
            {/* Route transaksi, untuk semua role yang login */}
            <Route
                path="/transactions"
                element={
                <ProtectedRoute>
                    <Transactions />
                </ProtectedRoute>
                }
            />
            </Route>

            {/* Route fallback untuk halaman tidak ditemukan */}
            <Route path="*" element={<NotFound />} />
        </Routes>
        </Router>
    );
};

export default AppRoutes;
