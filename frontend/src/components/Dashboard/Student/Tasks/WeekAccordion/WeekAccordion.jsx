import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { FaLock, FaLockOpen, FaCheckCircle } from "react-icons/fa";
import ProgressCircle from "../ProgressCircle";
import "./WeekAccordion.css";

const WeekAccordion = ({
    week,
    progress,
    completed,
    locked,
    expanded,
    onToggle,
    children,
}) => {
    return (
        <div className={`week-card ${locked ? "locked" : ""}`}>

            <motion.div
                className="week-header"
                whileHover={!locked ? { scale: 1.01 } : {}}
                onClick={() => {
                    if (!locked) onToggle();
                }}
            >

                <div className="week-left">

                    <h3>{week}</h3>

                    {completed && (
                        <FaCheckCircle className="week-check" />
                    )}

                </div>

                <div className="week-right">

                    <ProgressCircle
                        progress={progress}
                        completed={completed}
                        size={80}
                    />

                    <div className="week-lock">
                        {locked ? (
                            <FaLock />
                        ) : (
                            <FaLockOpen />
                        )}
                    </div>

                    <motion.div
                        animate={{
                            rotate: expanded ? 180 : 0,
                        }}
                        className="arrow"
                    >
                        <HiChevronDown />
                    </motion.div>

                </div>

            </motion.div>

            <AnimatePresence>

                {!locked && expanded && (

                    <motion.div
                        className="week-body"
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
                            duration: .35,
                        }}
                    >

                        {children}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>
    );
};

export default WeekAccordion;