import "./LearningAnalytics.css";

import { motion } from "framer-motion";

import {
  HiChartBar,
  HiClock,
  HiAcademicCap,
  HiArrowTrendingUp,
} from "react-icons/hi2";

const LearningAnalytics = ({ analytics }) => {

  const weeklyData = analytics?.weeklyData || [45, 80, 55, 95, 70, 88, 100];

  return (

    <motion.section

      className="analytics-card"

      initial={{ opacity:0,y:80 }}

      whileInView={{ opacity:1,y:0 }}

      viewport={{ once:true }}

      transition={{ duration:.8 }}

    >

      <div className="analytics-header">

        <div>

          <h2>

            <HiChartBar />

            Learning Analytics

          </h2>

          <p>

            Weekly learning performance overview

          </p>

        </div>

      </div>

      <div className="analytics-body">

        {/* LEFT */}

        <div className="chart-wrapper">

          <div className="chart-bars">

            {

              weeklyData.map((height,index)=>(

                <motion.div

                  key={index}

                  className="bar"

                  initial={{

                    height:0

                  }}

                  whileInView={{

                    height:`${height}%`

                  }}

                  transition={{

                    delay:index*.12,

                    duration:.7

                  }}

                >

                  <span>

                    {["M","T","W","T","F","S","S"][index]}

                  </span>

                </motion.div>

              ))

            }

          </div>

        </div>

        {/* RIGHT */}

        <div className="analytics-info">

          <div className="analytics-item">

            <HiAcademicCap/>

            <div>

              <h3>

                {analytics?.completedCourses || 12}

              </h3>

              <p>

                Completed Courses

              </p>

            </div>

          </div>

          <div className="analytics-item">

            <HiClock/>

            <div>

              <h3>

                {analytics?.hours || 124}h

              </h3>

              <p>

                Learning Hours

              </p>

            </div>

          </div>

          <div className="analytics-item">

            <HiArrowTrendingUp/>

            <div>

              <h3>

                {analytics?.growth || 32}%

              </h3>

              <p>

                Weekly Growth

              </p>

            </div>

          </div>

        </div>

      </div>

    </motion.section>

  );

};

export default LearningAnalytics;