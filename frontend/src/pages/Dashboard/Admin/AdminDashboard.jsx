import "./AdminDashboard.css";
import { motion } from "framer-motion";
import { FiUsers, FiCheckSquare, FiLayers, FiActivity } from "react-icons/fi";

function AdminDashboard() {
    return (
        <motion.div 
            className="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="dashboard-welcome">
                <h1>Admin <span>Overview</span></h1>
                <p>Manage platform interns, approve daily tasks, and monitor system metrics.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon blue"><FiUsers /></div>
                    <div>
                        <h3>Total Students</h3>
                        <p>1,240</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon yellow"><FiCheckSquare /></div>
                    <div>
                        <h3>Pending Approvals</h3>
                        <p>45 Tasks</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green"><FiLayers /></div>
                    <div>
                        <h3>Active Batches</h3>
                        <p>12</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple"><FiActivity /></div>
                    <div>
                        <h3>System Status</h3>
                        <p>Healthy</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default AdminDashboard;