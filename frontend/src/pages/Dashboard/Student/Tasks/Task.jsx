import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import {

  getMyTasks

} from "../../../../services/api/adminTask.service";

import CourseTaskCard from "../../../../components/Dashboard/Student/Tasks/CourseTaskCard";
import WeekAccordion from "../../../../components/Dashboard/Student/Tasks/WeekAccordion";
import DailyTaskCard from "../../../../components/Dashboard/Student/Tasks/DailyTask";

import "./Task.css";

export default function Task() {

  const [openCourse, setOpenCourse] = useState(null);
  const [openWeek, setOpenWeek] = useState(null);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadTasks();

  }, []);

  const loadTasks = async () => {

    try {

      const res = await getMyTasks();

      setTasks(

        res.tasks || []

      );

    }

    catch (error) {

      console.log(error);

    }

    finally {

      setLoading(false);

    }

  };

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

        tasks.map((task) => (

          <div key={task._id}>

            <CourseTaskCard

              courseName={task.internship?.title}

              duration={task.internship?.duration}

              progress={task.reviewStatus === "Approved"

                ? 100

                : task.reviewStatus === "Rejected"

                  ? 50

                  : task.status === "Completed"

                    ? 80

                    : 0}

              expanded={openCourse === task.internship?._id}

              onToggle={() =>
                setOpenCourse(
                  openCourse === task.internship?._id
                    ? null
                    : task.internship?._id
                )
              }

            />

            {

              openCourse === task.internship?._id && (

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

                              onClick={() =>

                                navigate(

                                  `/student/tasks/${task._id}`

                                )

                              }

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