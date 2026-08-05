import "./WelcomeCard.css";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from '../../../../../hooks/useAuth';

import { HiFire, HiAcademicCap, HiTrophy, HiSun, HiArrowRight } from "react-icons/hi2";

const WelcomeCard = ({ username, stats, streak }) => {
  const { user } = useAuth();
  const navigate = useNavigate();


  // Generate Hour count for greeting title changing
  const hour = new Date().getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";


  return (

    <motion.section
      className="welcomeCardMainCont"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8 }}
    >

      <div id="welcome-left">

        <span id="welcome-badge">
          <div id="welcomeBadgeIcon">
            <HiSun />
          </div>
          {greeting}
        </span>

        <h1>
          Welcome Back,
          <span>
            {
              username?.fullName?.trim() ? username?.fullName : user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)
            }
          </span>
        </h1>

        <p>Continue your learning journey and complete today's goals.</p>

        <motion.button
          whileHover={{scale: 1.05, x: 5}}
          className="hero-btn"
          onClick={()=> navigate('/student/dashboard')}
        >
          Continue Learning
          <HiArrowRight />
        </motion.button>
      </div>

      <div className="hero-right">

        {/* How many days you active on our site */}
        <motion.div
          whileHover={{ y: -8 }}
          className="mini-card"
        >
          <HiFire />
          <div>
            <h2>{streak?.days || '0'}</h2>
            <span>Day Streak</span>
          </div>
        </motion.div>


        {/* How many courses you enroll show here */}
        <motion.div
          whileHover={{ y: -8 }}
          className="mini-card"
        >
          <HiAcademicCap />
          <div>
            <h2>{stats?.internships.total || '0'}</h2>
            <span>Join internships</span>
          </div>
        </motion.div>

        {/* All badges count show here */}
        <motion.div
          whileHover={{ y: -8 }}
          className="mini-card"
        >
          <HiTrophy />
          <div>
            <h2>{stats?.badges || '0'}</h2>
            <span>Badges</span>
          </div>
        </motion.div>


      </div>
    </motion.section>
  );
};

export default WelcomeCard;