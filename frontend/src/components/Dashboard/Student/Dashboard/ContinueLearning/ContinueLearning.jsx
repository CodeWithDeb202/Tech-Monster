import { motion } from "framer-motion";
import ContinueCard from "../ContinueCard/ContinueCard";
import "./ContinueLearning.css";

const enrolledCourses = [
  {
    id: 1,
    name: "React Development",
    progress: 72,
    lessonsLeft: 8,
  },
  {
    id: 2,
    name: "Node.js",
    progress: 48,
    lessonsLeft: 15,
  },
  {
    id: 3,
    name: "MongoDB",
    progress: 90,
    lessonsLeft: 2,
  },
  {
    id: 4,
    name: "HTML & CSS",
    progress: 100,
    lessonsLeft: 0,
  },
  {
    id: 5,
    name: "JavaScript",
    progress: 63,
    lessonsLeft: 10,
  },
  {
    id: 6,
    name: "Express.js",
    progress: 35,
    lessonsLeft: 20,
  },
];

const ContinueLearning = () => {
  return (
    <section className="continue-learning">

      <motion.div
        className="section-title"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2>Continue Learning</h2>

        <p>Your enrolled courses</p>

      </motion.div>

      <div className="continue-grid">

        {enrolledCourses.map((course, index) => (

          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}

            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
          >

            <ContinueCard course={course} />

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default ContinueLearning;