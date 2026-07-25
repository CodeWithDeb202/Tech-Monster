import "./StudentDashboard.css";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiAward, FiBookOpen } from "react-icons/fi";

function StudentDashboard() {
    return (
        <motion.div 
            className="student-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="dashboard-welcome">
                <h1>Welcome Back, <span>Student!</span></h1>
                <p>Track your internship progress, daily tasks, and certificates here.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon blue"><FiBookOpen /></div>
                    <div>
                        <h3>Enrolled Courses</h3>
                        <p>4 Active</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon yellow"><FiClock /></div>
                    <div>
                        <h3>Pending Tasks</h3>
                        <p>2 Due Today</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green"><FiCheckCircle /></div>
                    <div>
                        <h3>Attendance</h3>
                        <p>94%</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple"><FiAward /></div>
                    <div>
                        <h3>Certificates</h3>
                        <p>1 Earned</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default StudentDashboard;