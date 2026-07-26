import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import "./ContinueCard.css";

const ContinueCard = ({ course }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="continue-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        scale: 1.03,
        rotateX: 6,
        rotateY: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
    >
      <div className="card-bg"></div>

      <h3>{course.name}</h3>

      {!hovered ? (
        <motion.div
          className="default-content"
          initial={{ opacity: 1 }}
          animate={{ opacity: hovered ? 0 : 1 }}
        >
          <p>Tap to Continue</p>

          <motion.div
            animate={{
              x: [0, 6, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
          >
            <ArrowRight size={22} />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="hover-content"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>{course.progress}% Completed</span>

          <div className="progress">

            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{
                width: `${course.progress}%`,
              }}
              transition={{ duration: 0.8 }}
            />

          </div>

          <small>{course.lessonsLeft} Lessons Left</small>

          <button>

            Continue

            <ArrowRight size={18} />

          </button>

        </motion.div>
      )}
    </motion.div>
  );
};

export default ContinueCard;