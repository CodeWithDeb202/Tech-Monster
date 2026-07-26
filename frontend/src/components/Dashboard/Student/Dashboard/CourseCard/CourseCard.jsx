import { motion } from "framer-motion";
import { Clock3, Star, ArrowRight } from "lucide-react";
import { useState } from "react";
import "./CourseCard.css";

const CourseCard = ({ course }) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="course-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{
        y: -10,
        rotateX: 6,
        rotateY: -6,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
    >
      {/* Top Banner */}
      <div className="course-banner">
        <div className="course-tag">
          {course.enrolled ? "Enrolled" : "New"}
        </div>
      </div>

      {/* Title */}
      <div className="course-info">
        <h3>{course.name}</h3>
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="course-overlay"
        initial={{ y: "100%" }}
        animate={{
          y: hover ? "0%" : "100%",
        }}
        transition={{ duration: 0.35 }}
      >
        <h3>{course.name}</h3>

        <p>{course.description}</p>

        <div className="course-meta">
          <span>
            <Star size={15} />
            {course.rating}
          </span>

          <span>
            <Clock3 size={15} />
            {course.duration}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Enroll Now
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CourseCard;