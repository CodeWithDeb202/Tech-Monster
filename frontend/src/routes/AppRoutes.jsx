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

// Student Dashboard
import StudentHome from '../pages/Dashboard/Student/Home';
import StudentDashboard from '../pages/Dashboard/Student/Dashboard';
import StudentTask from '../pages/Dashboard/Student/Tasks';
import StudentAttendance from '../pages/Dashboard/Student/Attendance';
import StudentAccount from '../pages/Dashboard/Student/Account';
import StudentCertificate from '../pages/Dashboard/Student/Certificate';
import StudentSetting from '../pages/Dashboard/Student/Setting';



import Notification from '../components/Dashboard/common/Notification';
import Message from '../components/Dashboard/common/Message';

// Admin Dashboard
import AdminDashboard from '../pages/Dashboard/Admin';
import HelpSupport from '../components/Dashboard/common/Help&Supp';




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
                    <Route index element={<StudentHome />} />
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/student/tasks" element={<StudentTask />} />
                    <Route path="/student/attendance" element={<StudentAttendance />} />
                    <Route path="/student/account" element={<StudentAccount />} />
                    <Route path="/student/certificate" element={<StudentCertificate />} />
                    <Route path="/student/settings" element={<StudentSetting />} />
                    <Route path="/student/help&support" element={<HelpSupport />} />
                    <Route path="/student/notification" element={<Notification />} />
                    <Route path="/student/message" element={<Message />} />
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