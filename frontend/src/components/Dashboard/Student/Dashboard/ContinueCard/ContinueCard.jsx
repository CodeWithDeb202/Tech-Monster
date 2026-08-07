import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "./ContinueCard.css";

const ContinueCard = ({ internship }) => {
  const navigate = useNavigate();
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
      animate={{
        height: hovered ? 240 : 150
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
        duration: 0.2,
        ease: "easeInOut"
      }}
    >
      <div className="card-bg"></div>

      <h3>{internship?.title}</h3>

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
          <span>{internship?.progress}% Completed</span>

          <div className="progress">

            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{
                width: `${internship?.progress}%`,
              }}
              transition={{ duration: 0.8 }}
            />

          </div>

          <small>{internship.remainingTasks} Tasks Left</small>

          <small>{internship.remainingNotes} Lession left</small>

          <button
            onClick={() => {
              const slug = internship?.slug || internship?.courseSlug || "frontend-dev";
              navigate(`/student/lessions/${slug}`);
            }}
          >
            Continue
            <ArrowRight size={18} />
          </button>

        </motion.div>
      )}
    </motion.div>
  );
};

export default ContinueCard;