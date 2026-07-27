import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import CourseTaskCard from "../../../../components/Dashboard/Student/Tasks/CourseTaskCard";
import WeekAccordion from "../../../../components/Dashboard/Student/Tasks/WeekAccordion";
import DailyTaskCard from "../../../../components/Dashboard/Student/Tasks/DailyTask";

import "./Task.css";

const courses = [
  {
    id: 1,
    courseName: "React Full Stack",
    duration: 12,
    progress: 35,

    weeks: [
      {
        id: 1,
        title: "Week 1",
        progress: 100,
        completed: true,
        locked: false,

        tasks: [
          {
            id: 1,
            day: 1,
            title: "HTML Revision",
            progress: 100,
            completed: true,
            expire: "Completed"
          },
          {
            id: 2,
            day: 2,
            title: "CSS Practice",
            progress: 70,
            completed: false,
            expire: "1 Day Left"
          }
        ]
      },

      {
        id: 2,
        title: "Week 2",
        progress: 0,
        completed: false,
        locked: false,

        tasks: [
          {
            id: 3,
            day: 1,
            title: "JavaScript Variables",
            progress: 0,
            completed: false,
            expire: "2 Days Left"
          }
        ]
      },

      {
        id: 3,
        title: "Week 3",
        progress: 0,
        completed: false,
        locked: true,
        tasks: []
      }
    ]
  }
];

export default function Task() {

  const [openCourse, setOpenCourse] = useState(null);
  const [openWeek, setOpenWeek] = useState(null);
  const navigate = useNavigate();

  return (

    <motion.div
      className="tasks-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <motion.h1
        className="page-title"
        initial={{ y: -40 }}
        animate={{ y: 0 }}
      >
        Daily Tasks
      </motion.h1>

      {

        courses.map((course) => (

          <div key={course.id}>

            <CourseTaskCard

              courseName={course.courseName}

              duration={course.duration}

              progress={course.progress}

              expanded={openCourse === course.id}

              onToggle={() =>
                setOpenCourse(
                  openCourse === course.id
                    ? null
                    : course.id
                )
              }

            />

            {

              openCourse === course.id && (

                <motion.div

                  className="weeks-wrapper"

                  initial={{ opacity: 0 }}

                  animate={{ opacity: 1 }}

                >

                  {

                    course.weeks.map((week) => (

                      <WeekAccordion

                        key={week.id}

                        week={week.title}

                        progress={week.progress}

                        completed={week.completed}

                        locked={week.locked}

                        expanded={openWeek === week.id}

                        onToggle={() =>
                          setOpenWeek(
                            openWeek === week.id
                              ? null
                              : week.id
                          )
                        }

                      >

                        {

                          week.tasks.map((task) => (

                            <DailyTaskCard

                              key={task.id}

                              day={task.day}

                              title={task.title}

                              progress={task.progress}

                              completed={task.completed}

                              expireIn={task.expire}

                              onClick={() => navigate(`/student/tasks/${task.id}`)}

                            />

                          ))

                        }

                      </WeekAccordion>

                    ))

                  }

                </motion.div>

              )

            }

          </div>

        ))

      }

    </motion.div>

  );
}