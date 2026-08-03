import "./StatsCards.css";
import { motion } from "framer-motion";

import {
  HiAcademicCap,
  HiCalendarDays,
  HiCheckCircle,
  HiTrophy,
} from "react-icons/hi2";

const StatsCards = ({ stats }) => {

  const data = [
    {
      id: 1,
      title: "Join internships",
      value: stats?.internships?.total || 0,
      suffix: "",
      icon: HiAcademicCap,
      color: "#00E5FF",
    },
    {
      id: 2,
      title: "Attendance",
      value: stats?.attendance?.percentage || 0,
      suffix: "%",
      icon: HiCalendarDays,
      color: "#10B981",
    },
    {
      id: 3,
      title: "Daily Tasks",
      value: stats?.tasks?.completed || 0,
      suffix: "",
      icon: HiCheckCircle,
      color: "#F59E0B",
    },
    {
      id: 4,
      title: "Earned Badges",
      value: stats?.badges || 0,
      suffix: "",
      icon: HiTrophy,
      color: "#EC4899",
    },
  ];

  return (
    <div id="stats-grid">
      {data.map((item, index) => {
        const IconComponent = item.icon;

        return (
          <motion.div
            key={item.id}
            id="stats-card"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ y: -10, scale: 1.04 }}
          >
            <div
              id="stats-icon"
              style={{ background: item.color }}
            >
              {IconComponent && <IconComponent />}
            </div>

            <h4>{item.title}</h4>

            <h2>
              {item.value} {item.suffix}
            </h2>

            <div
              id="stats-line"
              style={{ background: item.color }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;