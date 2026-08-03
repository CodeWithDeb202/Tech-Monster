import { Routes, Route } from 'react-router-dom';
// Errors page

import AuthenticationRequired from "../pages/StatusPages/AuthenticationRequired";
import Unauthorized from "../pages/StatusPages/Unauthorized";
import NotFound from "../pages/StatusPages/NotFound";
import TooManyRequests from "../pages/StatusPages/TooManyRequests";
import ServerError from "../pages/StatusPages/ServerError";
import Maintenance from "../pages/StatusPages/Maintenance";
import SessionExpired from "../pages/StatusPages/SessionExpired";
import AccountBlocked from "../pages/StatusPages/AccountBlocked";
import SomethingWentWrong from "../pages/StatusPages/SomethingWentWrong";
import Offline from "../pages/StatusPages/Offline";

import Landing from "../pages/LandingPages/Landing";


import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import AdminLogin from '../pages/Auth/AdminLogin';
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
import DailyTask from '../components/Dashboard/Student/Tasks/DailyTask';
import StudentAttendance from '../pages/Dashboard/Student/Attendance';
import StudentAccount from '../pages/Dashboard/Student/Account';
import StudentCertificate from '../pages/Dashboard/Student/Certificate';
import StudentSetting from '../pages/Dashboard/Student/Setting';



import Notification from '../components/Dashboard/common/Notification';
import Message from '../components/Dashboard/common/Message';

// Admin Dashboard
import Overview from '../pages/Dashboard/Admin/Overview';
import Students from '../pages/Dashboard/Admin/Students';
import Reports from '../pages/Dashboard/Admin/Reports';
import Internships from '../pages/Dashboard/Admin/Internships';
import TaskApproval from '../pages/Dashboard/Admin/TasksApproval';
import CertificateApproval from '../pages/Dashboard/Admin/CertificateApproval';
import InternshipsForm from '../components/Dashboard/Admin/Internships/InternshipsForm';





function AppRoutes() {
    return (
        <>
            <Routes>

                {/* Public Routes */}
                <Route path='/' element={<Landing />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin_login' element={<AdminLogin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path="/verify-signup-otp" element={<VerifySignupOTP />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />


                {/* Status Pages */}
                <Route path="/auth-required" element={<AuthenticationRequired />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/429" element={<TooManyRequests />} />
                <Route path="/500" element={<ServerError />} />
                <Route path="/503" element={<Maintenance />} />
                <Route path="/session-expired" element={<SessionExpired />} />
                <Route path="/account-blocked" element={<AccountBlocked />} />
                <Route path="/something-went-wrong" element={<SomethingWentWrong />} />
                <Route path="/offline" element={<Offline />} />



                {/* Student Dashboard Routes (Protected) */}
                <Route
                    path="/student"
                    element={
                        <ProtectedRoute role="student">
                            <DashboardLayout role="student" />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<StudentHome />} />
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="tasks" element={<StudentTask />} />
                    <Route path="tasks/:taskId" element={<DailyTask />} />
                    <Route path="attendance" element={<StudentAttendance />} />
                    <Route path="account" element={<StudentAccount />} />
                    <Route path="certificate" element={<StudentCertificate />} />
                    <Route path="settings" element={<StudentSetting />} />
                    <Route path="notification" element={<Notification />} />
                    <Route path="message" element={<Message />} />
                </Route>



                {/* Admin Dashboard Routes (Protected) */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <DashboardLayout role="admin" />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Overview />} />
                    <Route path='students' element={<Students />} />
                    <Route path='internships' element={<Internships />} />
                    <Route path='internships-form' element={<InternshipsForm />} />

                    <Route path='tasks' element={<TaskApproval />} />
                    <Route path='reports' element={<Reports />} />
                    <Route path='certificates' element={<CertificateApproval />} />
                    <Route path='settings' element={<StudentSetting />} />
                </Route>

                


                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </>
    )
}

export default AppRoutes;