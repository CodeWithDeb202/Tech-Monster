import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useNavigate } from 'react-router-dom';
import "./ContinueCard.css";

const ContinueCard = ({ internship }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      id="continue-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut"
      }}
    >
      <div id="card-bg">
        <img src={internship?.thumbnail} alt={internship?.title} />
      </div>

      <h3>{internship?.title}</h3>



      <span>{internship?.progress}% Completed</span>

      <div id="progress">
        <motion.div
          id="progress-fill"
          initial={{ width: 0 }}
          animate={{
            width: `${internship?.progress}%`,
          }}
          transition={{ duration: 0.8 }}
        />

      </div>

      <div id="continue-card-content">
        <small>{internship.remainingTasks} Tasks Left</small>
        <small>{internship.remainingNotes} Lession left</small>
      </div>

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
  );
};

export default ContinueCard;