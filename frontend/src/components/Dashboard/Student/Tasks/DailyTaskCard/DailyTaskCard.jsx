import { motion } from "framer-motion";
import {
    FaCheckCircle,
    FaClock,
    FaArrowRight,
} from "react-icons/fa";
import ProgressCircle from "./ProgressCircle";
import "./DailyTaskCard.css";

const DailyTaskCard = ({
    day,
    title,
    progress,
    completed,
    expireIn,
    onClick,
}) => {
    return (
        <motion.div
            className="daily-task-card"
            whileHover={{
                y: -5,
                scale: 1.01,
            }}
            transition={{
                duration: .25,
            }}
            onClick={onClick}
        >
            <div className="daily-left">

                <div className="day-badge">
                    Day {day}
                </div>

                <div className="task-details">

                    <h3>{title}</h3>

                    <div className="expire">

                        <FaClock />

                        <span>
                            Expires in {expireIn}
                        </span>

                    </div>

                </div>

            </div>

            <div className="daily-right">

                <ProgressCircle
                    progress={progress}
                    completed={completed}
                    size={75}
                />

                {completed && (
                    <FaCheckCircle className="done-icon" />
                )}

                <motion.div
                    whileHover={{
                        x: 5,
                    }}
                    className="go-icon"
                >
                    <FaArrowRight />
                </motion.div>

            </div>

            <div className="task-light"></div>

        </motion.div>
    );
};

export default DailyTaskCard;