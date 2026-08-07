import './LessonNavbar.css'

import {motion} from 'framer-motion';

import ReadingMode from "../ReadingMode";
import CircularProgressBar from "../CircularProgress";

export default function LessonNavbar({
    readingMode,
    setReadingMode,
    scrollYProgress
}){
    return(
        <>
            <motion.div
                id="lesson-fixed-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
            >
                <ReadingMode
                    readingMode={readingMode}
                    setReadingMode={setReadingMode}
                    compact
                />

                <CircularProgressBar progress={scrollYProgress} />
            </motion.div>
        </>
    )
}