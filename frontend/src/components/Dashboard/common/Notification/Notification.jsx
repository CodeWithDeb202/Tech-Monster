import{ useState } from 'react';
import { motion } from 'framer-motion';
import './Notification.css';

export default function Notification() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Admin Announcement', message: 'New React & Node full-stack module has been uploaded by Admin.', time: '10 mins ago', read: false },
    { id: 2, title: 'Task Approved', message: 'Your daily task for Day 15 was successfully verified and approved.', time: '2 hours ago', read: false },
    { id: 3, title: 'Certificate Update', message: 'Payment verified! You can now download your course certificate.', time: 'Yesterday', read: true },
    { id: 4, title: 'Attendance Streak', message: 'Congratulations! You have achieved your 7 days continuous attendance badge.', time: '2 days ago', read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="notification-page-wrapper">
      <div className="notification-page-header">
        <h2 className="notification-main-title">Notifications</h2>
        <button className="mark-all-btn" onClick={markAllAsRead}>Mark all as read</button>
      </div>

      <div className="notifications-container">
        {notifications.map((item, index) => (
          <motion.div 
            key={item.id}
            className={`notification-card ${!item.read ? 'unread' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            onClick={() => markAsRead(item.id)}
          >
            <div className="notif-content">
              <h4>{item.title}</h4>
              <p>{item.message}</p>
              <span className="notif-time">{item.time}</span>
            </div>
            <div className={`read-status-dot ${item.read ? 'read' : ''}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}