import "./DashboardLayout.css";
import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
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
    FiSearch, 
    FiBell,
    FiMessageSquare,
    FiMenu,
    FiX
} from "react-icons/fi";
import logo from "../../assets/logo/logo.png";

function DashboardLayout({ role = "student" }) {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const studentLinks = [
        { name: "Home", path: "/student/home", icon: <FiHome /> },
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

    return (
        <div className="dashboard-container">
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

            {/* SIDEBAR (Logo Removed from here) */}
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

            {/* MAIN CONTENT AREA */}
            <main className="dashboard-main">
                {/* TOP NAVBAR WITH LOGO */}
                <header className="dashboard-navbar">
                    <div className="nav-left-section">
                        <button className="menu-toggle-btn" onClick={() => setIsMobileMenuOpen(true)}>
                            <FiMenu />
                        </button>
                        
                        {/* Logo placed in Navbar */}
                        <div className="navbar-logo">
                            <img src={logo} alt="Logo" />
                            <h2>Tech <span>Monster</span></h2>
                        </div>
                    </div>

                    {/* Middle Search Bar */}
                    <div className="search-bar">
                        <FiSearch className="search-icon" />
                        <input type="text" placeholder="Search what you want??" />
                    </div>

                    {/* Right Icons & User Profile */}
                    <div className="navbar-right">
                        <button className="notification-btn" title="Notifications">
                            <FiBell />
                        </button>
                        <button className="notification-btn" title="Messages">
                            <FiMessageSquare />
                        </button>

                        {/* User Profile with Hover Popup */}
                        <div 
                            className="user-profile-wrapper"
                            onMouseEnter={() => setShowProfilePopup(true)}
                            onMouseLeave={() => setShowProfilePopup(false)}
                        >
                            <div className="user-profile">
                                <div className="avatar-circle">
                                    <FiUser />
                                </div>
                                <span className="username">@Debabrata</span>
                            </div>

                            <AnimatePresence>
                                {showProfilePopup && (
                                    <motion.div 
                                        className="profile-popup"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link to={`/${role}/account`} className="popup-item">
                                            <FiUser /> Profile
                                        </Link>
                                        <button onClick={handleLogout} className="popup-item logout">
                                            <FiLogOut /> Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* DYNAMIC PAGE CONTENT */}
                <div className="dashboard-content-wrapper">
                    <div className="dashboard-content">
                        <Outlet />
                    </div>

                    {/* FOOTER */}
                    <footer className="dashboard-footer">
                        <p>© 2026 Tech Monster | Built with passion for tech learners.</p>
                    </footer>
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;