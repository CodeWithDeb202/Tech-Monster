import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    ChevronRight,
    CheckCircle2,
    Circle,
    BookOpen,
} from "lucide-react";

import "./LessonAccordion.css";

export default function LessonAccordion({
    lesson,
    module,
    activeLesson,
    setActiveLesson,
}) {
    const [open, setOpen] = useState(true);

    return (
        <div id="lesson-module">
            {/* Module Header */}

            <motion.div
                whileTap={{ scale: 0.98 }}
                id="module-header"
                onClick={() => setOpen(!open)}
            >
                <div id="module-title">
                    <BookOpen size={18} />

                    <div>
                        <h3>{lesson.title}</h3>

                        <span>
                            {lesson.length || 0} Lessons
                        </span>
                    </div>
                </div>

                {open ? (
                    <ChevronDown size={20} />
                ) : (
                    <ChevronRight size={20} />
                )}
            </motion.div>

            {/* Lessons */}

            <AnimatePresence>

                {open && (
                    <motion.div
                        id="module-lessons"
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.35,
                        }}
                    >
                        {module.map((lesson) => (

                            console.log("lesson", lesson), 
                            <motion.div
                                key={lesson.id}
                                whileHover={{
                                    x: 6,
                                }}
                                whileTap={{
                                    scale: 0.98,
                                }}
                                className={`accordion-lesson ${activeLesson === lesson.id
                                        ? "active"
                                        : ""
                                    }`}
                                onClick={() =>
                                    setActiveLesson(lesson.id)
                                }
                            >
                                <div className="lesson-icon">
                                    {lesson.completed ? (
                                        <CheckCircle2
                                            size={18}
                                            className="completed"
                                        />
                                    ) : (
                                        <Circle
                                            size={18}
                                            className="pending"
                                        />
                                    )}
                                </div>

                                <div id="lesson-text">
                                    <h4>{lesson.heading}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}