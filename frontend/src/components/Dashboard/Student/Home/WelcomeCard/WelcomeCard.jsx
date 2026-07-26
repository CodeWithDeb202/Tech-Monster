import "./WelcomeCard.css";

import { motion } from "framer-motion";

import {
  HiFire,
  HiAcademicCap,
  HiTrophy,
  HiSun,
  HiArrowRight
} from "react-icons/hi2";

const WelcomeCard = ({ user, stats, streak }) => {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (

    <motion.section
      className="welcomeCardMainCont"
      initial={{opacity:0,y:50}}
      animate={{opacity:1,y:0}}
      transition={{duration:.8}}
    >

      <div id="welcome-left">

        <span id="welcome-badge">
          <div id="welcomeBadgeIcon">
            <HiSun/>
          </div>

          {greeting}

        </span>

        <h1>
          Welcome Back,
          <span>{user.fullName}</span>
        </h1>

        <p>Continue your learning journey and complete today's goals.</p>

        <motion.button

          whileHover={{

            scale:1.05,

            x:5

          }}

          className="hero-btn"

        >

          Continue Learning

          <HiArrowRight/>

        </motion.button>

      </div>

      <div className="hero-right">

        <motion.div

          whileHover={{y:-8}}

          className="mini-card"

        >

          <HiFire/>

          <div>

            <h2>{streak.days}</h2>

            <span>Day Streak</span>

          </div>

        </motion.div>

        <motion.div

          whileHover={{y:-8}}

          className="mini-card"

        >

          <HiAcademicCap/>

          <div>

            <h2>{stats.courses}</h2>

            <span>Courses</span>

          </div>

        </motion.div>

        <motion.div

          whileHover={{y:-8}}

          className="mini-card"

        >

          <HiTrophy/>

          <div>

            <h2>{stats.badges}</h2>

            <span>Badges</span>

          </div>

        </motion.div>

      </div>

    </motion.section>

  );

};

export default WelcomeCard;