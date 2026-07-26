import './Sidebar.css';

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FiHome, 
    FiGrid, 
    FiCheckSquare, 
    FiCalendar, 
    FiUser, 
    FiAward, 
    FiSettings, 
    FiLogOut, 
    FiX
} from "react-icons/fi";

function Sidebar({role="student"}) {

    const navigate = useNavigate();
    const location = useLocation();
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const studentLinks = [
        { name: "Home", path: "/student", icon: <FiHome /> },
        { name: "Dashboard", path: "/student/dashboard", icon: <FiGrid /> },
        { name: "Daily Task", path: "/student/tasks", icon: <FiCheckSquare /> },
        { name: "Attendance", path: "/student/attendance", icon: <FiCalendar /> },
        { name: "Account", path: "/student/account", icon: <FiUser /> },
        { name: "Certificate", path: "/student/certificate", icon: <FiAward /> },
    ];

    const adminLinks = [
        { name: "Overview", path: "/admin/dashboard", icon: <FiHome /> },
        { name: "Manage Students", path: "/admin/students", icon: <FiUser /> },
        { name: "Task Approvals", path: "/admin/tasks", icon: <FiCheckSquare /> },
        { name: "Reports", path: "/admin/reports", icon: <FiGrid /> },
        { name: "Settings", path: "/admin/settings", icon: <FiSettings /> },
    ];

    const navLinks = role === "admin" ? adminLinks : studentLinks;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };


    return(
        <>
            {/* MOBILE OVERLAY */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        className="sidebar-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR */}
            <motion.aside 
                className={`dashboard-sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <div className="sidebar-header-mobile">
                    <h3>Tech <span>Monster</span></h3>
                    <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
                        <FiX />
                    </button>
                </div>

                <ul className="sidebar-menu">
                    {navLinks.map((link, index) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <li key={index} className={isActive ? "active" : ""}>
                                <Link to={link.path}>
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="sidebar-footer">
                    <Link to={`/${role}/settings`} className={location.pathname.includes("settings") ? "active" : ""}>
                        <FiSettings />
                        <span>Setting</span>
                    </Link>
                    <button onClick={handleLogout} className="logout-btn">
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </motion.aside>
        
        </>
    )
}

export default Sidebar;