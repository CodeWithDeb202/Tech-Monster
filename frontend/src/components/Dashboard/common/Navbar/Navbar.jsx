import './Navbar.css';

import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiUser,
    FiLogOut,
    FiBell,
    FiMessageSquare,
    FiMenu,
} from "react-icons/fi";
import logo from "../../../../assets/logo/logo.png";
import SystemBar from '../../../Common/Navbar/SystemBar';
import SearchBar from '../../../Common/SearchBar';

function Navbar({ role = "student" }) {

    const navigate = useNavigate();
    // const location = useLocation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <>
            <nav id='navDash'>
                <SystemBar />

                <header id="dashboard-navbar">
                    <div id="nav-left-section">
                        <button id="menu-toggle-btn" onClick={() => setIsMobileMenuOpen(true)}>
                            <FiMenu />
                        </button>

                        {/* Logo placed in Navbar */}
                        <div id="navbar-logo">
                            <img src={logo} alt="Logo" />
                            <h2>Tech <span>Monster</span></h2>
                        </div>
                    </div>

                    {/* Middle Search Bar */}
                    
                    <SearchBar />
                    

                    {/* Right Icons & User Profile */}
                    <div id="navbar-right">
                        <NavLink to={`/${role}/notification`} className={({isActive}) => isActive ? 'notification-btn active' : 'notification-btn'}>
                            <FiBell />
                        </NavLink>
                        <NavLink to={`/${role}/message`} className={({isActive}) => isActive ? 'message-btn active' : 'message-btn'}>
                            <FiMessageSquare />
                        </NavLink>

                        <div id="verticalLine"></div>

                        {/* User Profile with Hover Popup */}
                        <div
                            id="user-profile-wrapper"
                            onMouseEnter={() => setShowProfilePopup(true)}
                            onMouseLeave={() => setShowProfilePopup(false)}
                        >
                            <div id="user-profile">
                                <div id="avatar-circle">
                                    <FiUser />
                                </div>
                                <span id="username">@Debabrata</span>
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
            </nav>
        </>
    )
}

export default Navbar;