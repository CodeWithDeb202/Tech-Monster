import { motion } from "framer-motion";
import CourseCard from "../CourseCard/CourseCard";
import "./AllCourses.css";

const courses = [
  {
    id: 1,
    name: "React Development",
    description: "Learn React from beginner to advanced level.",
    rating: 4.8,
    duration: "1 Month",
    enrolled: false,
  },
  {
    id: 2,
    name: "Node.js",
    description: "Backend development using Express & Node.",
    rating: 4.7,
    duration: "1 Month",
    enrolled: false,
  },
  {
    id: 3,
    name: "MongoDB",
    description: "Master NoSQL database with Mongoose.",
    rating: 4.9,
    duration: "1 Month",
    enrolled: true,
  },
  {
    id: 4,
    name: "JavaScript",
    description: "Modern JavaScript ES6+ concepts.",
    rating: 4.6,
    duration: "1 Month",
    enrolled: false,
  },
  {
    id: 5,
    name: "HTML & CSS",
    description: "Complete frontend foundation.",
    rating: 4.5,
    duration: "1 Month",
    enrolled: true,
  },
];

const AllCourses = () => {
  return (
    <section className="all-courses">

      <motion.div
        className="course-heading"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2>All Courses</h2>
        <p>Explore every available course</p>
      </motion.div>

      <div className="course-grid">

        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * .1,
              duration: .5
            }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default AllCourses;