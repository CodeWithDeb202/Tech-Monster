import "./ProfileSummary.css";
import { motion } from "framer-motion";
import {
  HiCheckBadge,
  HiEnvelope,
  HiUserCircle,
} from "react-icons/hi2";

const ProfileSummary = ({ user }) => {
  const skills = user?.skills || [];

  const progress = user?.profileCompletion || 75;

  return (
    <motion.section
      className="profile-summary"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
      }}
    >
      {/* Glow */}

      <div className="profile-glow profile-glow-1"></div>

      <div className="profile-glow profile-glow-2"></div>

      {/* LEFT */}

      <div className="profile-left">

        <motion.div
          whileHover={{
            rotate: 3,
            scale: 1.05,
          }}
          className="profile-image"
        >
          <img
            src={
              user?.profilePhoto ||
              "/images/default-avatar.png"
            }
            alt={user?.fullName}
          />
        </motion.div>

        <div className="profile-info">

          <h2>{user?.fullName}</h2>

          <p>

            <HiEnvelope />

            {user?.email}

          </p>

          <div className="skills-wrapper">

            {skills.map((skill, index) => (
              <motion.span
                key={index}
                className="skill-chip"
                initial={{
                  opacity: 0,
                  scale: .8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: index * .08,
                }}
              >
                {skill}
              </motion.span>
            ))}

          </div>

        </div>

      </div>

      {/* Divider */}

      <motion.div
        className="profile-divider"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: .7 }}
      />

      {/* Right */}

      <div className="profile-right">

        <div className="progress-title">

          <HiCheckBadge />

          <span>Profile Completion</span>

        </div>

        <div className="progress-bar">

          <motion.div
            className="progress-fill"
            initial={{
              width: 0,
            }}
            whileInView={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 1.5,
            }}
          />

        </div>

        <h1>{progress}%</h1>

        <p>
          Complete your remaining profile
          details to unlock all platform
          features.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{
            scale: .95,
          }}
          className="complete-btn"
        >
          <HiUserCircle />

          Complete Profile

        </motion.button>

      </div>

    </motion.section>
  );
};

export default ProfileSummary;