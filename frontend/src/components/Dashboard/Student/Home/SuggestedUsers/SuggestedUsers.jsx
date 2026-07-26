import "./SuggestedUsers.css";

import { motion } from "framer-motion";

import {
  HiUsers,
  HiArrowRight,
  HiCheckBadge,
} from "react-icons/hi2";

const SuggestedUsers = ({ users = [] }) => {
  return (
    <motion.section
      className="suggested-users"

      initial={{ opacity: 0, y: 80 }}

      whileInView={{ opacity: 1, y: 0 }}

      viewport={{ once: true }}

      transition={{ duration: .8 }}
    >

      <div className="users-header">

        <div>

          <h2>

            <HiUsers />

            Suggested Users

          </h2>

          <p>
            Connect with learners having similar interests.
          </p>

        </div>

        <motion.button

          whileHover={{
            scale: 1.05
          }}

          className="view-all-users"

        >

          View All

          <HiArrowRight />

        </motion.button>

      </div>

      <div className="users-grid">

        {

          users.map((user,index)=>(

            <motion.div

              key={user._id || index}

              className="user-card"

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
                y:-10,
                scale:1.03
              }}

            >

              <div className="user-top">

                <div className="user-avatar">

                  <img

                    src={user.avatar}

                    alt={user.fullName}

                  />

                  <span className="online-dot"></span>

                </div>

                <div>

                  <h3>

                    {user.fullName}

                  </h3>

                  <p>

                    {user.role}

                  </p>

                </div>

              </div>

              <div className="user-skills">

                {

                  user.skills?.map((skill,i)=>(

                    <span key={i}>

                      {skill}

                    </span>

                  ))

                }

              </div>

              <div className="mutual">

                <HiCheckBadge />

                {user.mutual} Mutual Skills

              </div>

              <div className="user-buttons">

                <motion.button

                  whileHover={{
                    scale:1.05
                  }}

                  className="follow-btn"

                >

                  Follow

                </motion.button>

                <motion.button

                  whileHover={{
                    scale:1.05
                  }}

                  className="profile-btn"

                >

                  View Profile

                </motion.button>

              </div>

            </motion.div>

          ))

        }

      </div>

    </motion.section>
  );
};

export default SuggestedUsers;