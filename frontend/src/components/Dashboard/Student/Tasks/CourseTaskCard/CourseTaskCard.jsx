import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import ProgressCircle from "./ProgressCircle";
import "./CourseTaskCard.css";

const CourseTaskCard = ({
  courseName,
  duration,
  progress,
  expanded,
  onToggle,
}) => {
  return (
    <motion.div
      className="course-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.01,
      }}
      transition={{ duration: .4 }}
    >
      <div className="course-left">

        <div className="course-info">

          <h3>{courseName}</h3>

          <span>Course</span>

        </div>

        <div className="divider"></div>

        <div className="duration">

          <h3>{duration}</h3>

          <span>Total Weeks</span>

        </div>

      </div>

      <div className="course-right">

        <ProgressCircle progress={progress} />

        <motion.button
          whileTap={{ scale: .9 }}
          whileHover={{ rotate: 180 }}
          className="expand-btn"
          onClick={onToggle}
        >
          <motion.div
            animate={{
              rotate: expanded ? 180 : 0,
            }}
          >
            <HiChevronDown />
          </motion.div>
        </motion.button>

      </div>

      <div className="card-glow"></div>

    </motion.div>
  );
};

export default CourseTaskCard;