import "./InternshipRecommendation.css";

import {useNavigate} from 'react-router-dom';

import { motion } from "framer-motion";

import {
  HiArrowRight,
  HiBookOpen,
  HiStar,
  HiPlayCircle,
} from "react-icons/hi2";

const InternshipRecommendation = ({ internships = [] }) => {
  const navigate = useNavigate();

  return (

    <motion.section
      className="course-section"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .7 }}
    >

      {/* Header */}

      <div className="course-header">
        <div>
          <h2>
            <HiBookOpen />
            Recommended Internships
          </h2>

          <p>
            Internships selected specially for you.
          </p>
        </div>



        <motion.button
          whileHover={{
            scale: 1.05
          }}
          className="view-btn"
          onClick={() => navigate('/student/dashboard')}
        >
          View All
          <HiArrowRight />
        </motion.button>
      </div>

      {/* Cards */}

      <div className="course-slider">

        {

          internships.map((internship,index)=>(

            <motion.div

              key={internship._id || index}

              className="course-card"

              initial={{
                opacity:0,
                y:50
              }}

              whileInView={{
                opacity:1,
                y:0
              }}

              transition={{
                delay:index*.15
              }}

              whileHover={{
                y:-12,
                rotateX:5,
                rotateY:-5
              }}

            >

              {/* Image */}

              <div className="course-image">

                <img

                  src={internship.thumbnail}

                  alt={internship.title}

                />

              </div>

              {/* Content */}

              <div className="course-content">

                <span className="course-category">

                  {internship.category}

                </span>

                <h3>

                  {internship.title}

                </h3>

                <div className="course-meta">

                  <span>

                    <HiStar />

                    {internship.rating}

                  </span>

                  <span>

                    {internship.lessons} lessons

                  </span>

                </div>

                <motion.button

                  whileHover={{
                    x:6
                  }}

                  className="continue-btn"

                >

                  <HiPlayCircle />

                  Continue

                </motion.button>

              </div>

            </motion.div>

          ))

        }

      </div>

    </motion.section>

  );

};

export default InternshipRecommendation;