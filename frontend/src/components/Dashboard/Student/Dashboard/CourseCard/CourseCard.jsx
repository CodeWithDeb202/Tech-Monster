import { motion } from "framer-motion";
import { Clock3, ArrowRight } from "lucide-react";
import { useState } from "react";
import "./CourseCard.css";
import {toast} from 'react-toastify';

import api from "../../../../../services/api/axios";
import { API } from "../../../../../services/api/endpoints";

const CourseCard = ({ internship, refreshDashboard }) => {
  const [hover, setHover] = useState(false);

  const handleJoin = async () => {
    try {

      await api.post(
        API.INTERNSHIPS.JOIN(internship._id)
      );

      await refreshDashboard();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Unable to join internship"
      );

    }
  };

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
          {internship?.enrolled ? "Enrolled" : "New"}
        </div>
      </div>

      {/* Title */}
      <div className="course-info">
        <h3>{internship?.title}</h3>
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
        <h3>{internship?.title}</h3>

        <p>{internship?.description}</p>
        <p>{internship?.level}</p>

        <div className="course-meta">
          <span>
            Total Tasks : &nbsp;
            {internship?.totalTasks}
          </span>

          <span>
            Total Notes : &nbsp;
            {internship?.totalNotes}
          </span>

          <span>
            <Clock3 size={15} />
            {internship?.duration} days
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleJoin}
        >
          Enroll Now
          <ArrowRight size={18} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CourseCard;