import { Routes, Route } from 'react-router-dom';

import Landing from "../pages/LandingPages/Landing";


import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';


import DashboardLayout from '../layouts/Dashboard';
import ProtectedRoute from './ProtectedRoute';


import VerifySignupOTP from '../pages/Auth/VerifySignupOTP';
import VerifyResetOTP from '../pages/Auth/VerifyResetOTP';

import StudentDashboard from '../pages/Dashboard/Student';
import AdminDashboard from '../pages/Dashboard/Admin';


// Dashboards




function AppRoutes() {
    return (
        <>
            <Routes>

                {/* Public Routes */}
                <Route path='/' element={<Landing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path="/verify-signup-otp" element={<VerifySignupOTP />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />



                {/* Student Dashboard Routes (Protected) */}
                <Route
                    path='/student'
                    element={
                        <ProtectedRoute role="student">
                            <DashboardLayout role="student" />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/student/home" element={<StudentDashboard />} />
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/student/tasks" element={<StudentDashboard />} />
                    <Route path="/student/attendance" element={<StudentDashboard />} />
                    <Route path="/student/account" element={<StudentDashboard />} />
                    <Route path="/student/certificate" element={<StudentDashboard />} />
                    <Route path="/student/settings" element={<StudentDashboard />} />
                    <Route path="/student/help&support" element={<StudentDashboard />} />
                    <Route path="/student/notification" element={<StudentDashboard />} />
                    <Route path="/student/message" element={<StudentDashboard />} />
                </Route>



                {/* Admin Dashboard Routes (Protected) */}
                <Route
                path='/admin'
                    element={
                        <ProtectedRoute role="admin">
                            <DashboardLayout role="admin" />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    {/* Apan eithi admin ra anyanya routes bi add kariparibe */}
                </Route>

            </Routes>
        </>
    )
}

export default AppRoutes;