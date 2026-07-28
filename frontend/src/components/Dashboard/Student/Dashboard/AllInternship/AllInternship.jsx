import { motion } from "framer-motion";
import CourseCard from "../CourseCard/CourseCard";
import "./AllInternship.css";



const AllInternship = ({internships}) => {
  return (
    <section className="all-courses">

      <motion.div
        className="course-heading"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2>All Internships</h2>
        <p>Explore every available Internships</p>
      </motion.div>

      <div className="course-grid">

        {internships.map((internship, index) => (
          <motion.div
            key={internship._id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * .1,
              duration: .5
            }}
          >
            <CourseCard internship={internship} />
          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default AllInternship;