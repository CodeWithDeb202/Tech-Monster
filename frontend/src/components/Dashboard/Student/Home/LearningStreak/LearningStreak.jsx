import "./LearningStreak.css";

import { motion } from "framer-motion";

import {
  HiFire,
  HiBolt,
  HiArrowTrendingUp,
} from "react-icons/hi2";

const LearningStreak = ({ streak }) => {

  return (

    <motion.section

      className="learning-streak"

      initial={{ opacity:0,y:80 }}

      whileInView={{ opacity:1,y:0 }}

      viewport={{ once:true }}

      transition={{ duration:.8 }}

    >

      <div className="streak-glow"></div>

      <div className="streak-left">

        <motion.div

          animate={{

            rotate:[0,8,-8,0],

            scale:[1,1.05,1]

          }}

          transition={{

            repeat:Infinity,

            duration:3

          }}

          className="fire-icon"

        >

          <HiFire/>

        </motion.div>

        <div>

          <h2>

            {streak?.days || 0} Day Streak 🔥

          </h2>

          <p>

            Keep learning every day to maintain your streak.

          </p>

        </div>

      </div>

      <div className="streak-right">

        <div className="streak-progress">

          <motion.div

            className="streak-fill"

            initial={{ width:0 }}

            whileInView={{

              width:`${streak?.progress || 75}%`

            }}

            transition={{

              duration:2

            }}

          />

        </div>

        <div className="streak-footer">

          <span>

            <HiBolt/>

            Weekly Goal

          </span>

          <strong>

            {streak?.progress || 75}%

          </strong>

        </div>

        <motion.button

          whileHover={{

            scale:1.05,

            y:-4

          }}

          whileTap={{

            scale:.95

          }}

          className="continue-streak-btn"

        >

          <HiArrowTrendingUp/>

          Continue Streak

        </motion.button>

      </div>

    </motion.section>

  );

};

export default LearningStreak;