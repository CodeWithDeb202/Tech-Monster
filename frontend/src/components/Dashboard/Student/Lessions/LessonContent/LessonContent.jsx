import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";

import { toast } from "react-toastify";

import LessonNavbar from './Components/lessonNavbar';

import "./LessonContent.css";
import LessonHeader from "./Components/LessonHeader";
import LessonPage from "./Components/LessonPage";

export default function LessonContent({
    lesson,
    toggleBookmark,
    handleComplete,
    readingMode,
    setReadingMode,
}) {
     const contentRef = useRef(null);

    const { scrollYProgress } = useScroll({
        container: contentRef
    });

    const completedRef = useRef(false);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {

        if (latest >= .99 && !completedRef.current) {

            completedRef.current = true;

            handleComplete();

            toast.success("Lesson Completed 🎉");

        }

    });



    return (
        <motion.div
            id="lesson-content-wrapper"
            ref={contentRef}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.45,
            }}
        >

            {/* Navbar */}
            <LessonNavbar 
                readingMode={readingMode}
                setReadingMode={setReadingMode}
                scrollYProgress={scrollYProgress}
            />

            {/* Lesson Header */}

            <LessonHeader 
                toggleBookmark={toggleBookmark} 
                lesson={lesson} 
            />


            {/* Lesson page */}

            <LessonPage 
                lesson={lesson} 
            />


        </motion.div>
    );
}