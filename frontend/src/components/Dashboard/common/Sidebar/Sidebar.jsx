import './Sidebar.css';

import useAuth from '../../../../hooks/useAuth';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';

import {
    FiHome,
    FiGrid,
    FiCheckSquare,
    FiCalendar,
    FiUser,
    FiBookOpen,
    FiCreditCard,
    FiAward,
    FiSettings,
    FiLogOut,
    FiX,
    FiLock,
    FiHelpCircle,
    FiChevronLeft,
    FiMenu
} from "react-icons/fi";


function Sidebar({
    role = "student",
    isCourseCompleted = false,
    collapsed = false,
    onToggleCollapse
}) {
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
        { name: "Lessions", path: "/student/lessions", icon: <FiBookOpen /> },
        { name: "Daily Task", path: "/student/tasks", icon: <FiCheckSquare /> },
        { name: "Attendance", path: "/student/attendance", icon: <FiCalendar /> },
        { name: "Account", path: "/student/account", icon: <FiUser /> },
        { name: "Certificate", path: "/student/certificate", icon: <FiAward />, locked: !isCourseCompleted },
        { name: "Help & Support", path: "/student/help&support", icon: <FiHelpCircle /> },
    ];

    const adminLinks = [
        { name: "Overview", path: "/admin", icon: <FiHome /> },
        { name: "Manage Students", path: "/admin/students", icon: <FiUser /> },
        { name: "Internships", path: "/admin/internships", icon: <FiBookOpen /> },
        { name: "Task Approval", path: "/admin/tasks", icon: <FiCheckSquare /> },
        { name: "Reports", path: "/admin/reports", icon: <FiGrid /> },
        { name: "Certificate Approval", path: "/admin/certificates", icon: <FiCreditCard /> },
    ];

    const navLinks = role === 'admin' ? adminLinks : studentLinks;

    const handleLinkClick = (e, link) => {
        if (link.locked) {
            e.preventDefault();
            toast.warning("Complete all internship tasks to unlock your certificate!");
        }
    };

    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();

        sessionStorage.setItem("logoutSuccess", "true");

        navigate("/login", { replace: true });
    };

    return (
        <>
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

            <motion.aside
                className={`dashboard-sidebar ${collapsed ? "collapsed" : ""} ${isMobileMenuOpen ? "mobile-open" : ""}`}
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                {/* Collapse toggle */}
                <button
                    id="sidebar-collapse-btn"
                    onClick={() => onToggleCollapse && onToggleCollapse()}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <FiMenu /> : <FiChevronLeft />}
                </button>

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
                            <li key={index} className={`${isActive ? "active" : ""} ${link.locked ? "locked-link" : ""}`}>
                                <Link to={link.locked ? "#" : link.path} onClick={(e) => handleLinkClick(e, link)}>
                                    <span className="sidebar-link-icon">{link.linkIcon || link.icon}</span>
                                    {!collapsed && <span className="sidebar-link-label">{link.name}</span>}
                                    {link.locked && !collapsed && <FiLock className="lock-icon-right" />}
                                    {collapsed && (
                                        <span className="sidebar-tooltip">{link.name}</span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="sidebar-footer">
                    <Link to={`/${role}/settings`} className={location.pathname.includes("settings") ? "active" : ""}
                        title={collapsed ? "Setting" : undefined}>
                        <span className="sidebar-link-icon"><FiSettings /></span>
                        {!collapsed && <span className="sidebar-link-label">Setting</span>}
                        {collapsed && <span className="sidebar-tooltip">Setting</span>}
                    </Link>
                    <button onClick={handleLogout} className="logout-btn">
                        <span className="sidebar-link-icon"><FiLogOut /></span>
                        {!collapsed && <span className="sidebar-link-label">Logout</span>}
                        {collapsed && <span className="sidebar-tooltip">Logout</span>}
                    </button>
                </div>
            </motion.aside>
        </>
    );
}

export default Sidebar;
