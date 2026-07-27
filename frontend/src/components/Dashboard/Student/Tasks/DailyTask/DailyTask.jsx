import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaClock,
    FaPaperPlane,
    FaCheckCircle,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

import CodeEditor from "../CodeEditor";

import "./DailyTask.css";

const questions = [
    {
        id: 1,
        title: "Question 1",
        question:
            "Write a JavaScript function to reverse a string."
    },
    {
        id: 2,
        title: "Question 2",
        question:
            "Explain the difference between let, const and var."
    },
    {
        id: 3,
        title: "Question 3",
        question:
            "Create a function that checks whether a number is prime."
    }
];

export default function DailyTask() {
    const { taskId } = useParams();

    console.log(taskId);

    const [answer, setAnswer] = useState("");
    const [code, setCode] = useState("");

    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft(prev => {

                let { days, hours, minutes, seconds } = prev;

                if (seconds > 0) {

                    seconds--;

                }

                else {

                    seconds = 59;

                    if (minutes > 0) {

                        minutes--;

                    }

                    else {

                        minutes = 59;

                        if (hours > 0) {

                            hours--;

                        }

                        else {

                            hours = 23;

                            if (days > 0) {

                                days--;

                            }

                        }

                    }

                }

                return { days, hours, minutes, seconds };

            });

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const handleSubmit = () => {

        const payload = {

            code,

            answer,

        };

        console.log(payload);

        // Later API call
        // axios.post("/api/task/submit", payload);

    };

    return (

        <motion.div

            className="daily-page"

            initial={{ opacity: 0, y: 40 }}

            animate={{ opacity: 1, y: 0 }}

        >

            <div className="daily-header">

                <div>

                    <h1>React Full Stack</h1>

                    <p>Week 1 • Day 1 Task</p>

                </div>

                <div className="timer-box">

                    <FaClock />

                    <span>

                        {timeLeft.days}d :

                        {timeLeft.hours}h :

                        {timeLeft.minutes}m :

                        {timeLeft.seconds}s

                    </span>

                </div>

            </div>

            <div className="questions">

                {

                    questions.map((item) => (

                        <motion.div

                            key={item.id}

                            className="question-card"

                            whileHover={{ y: -4 }}

                        >

                            <h2>{item.title}</h2>

                            <p>{item.question}</p>

                        </motion.div>

                    ))

                }

            </div>

            <div className="answer-section">

                <h2>Write Your Code</h2>

                <CodeEditor
                    language="javascript"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                />

                <h2 style={{ marginTop: "25px" }}>
                    Answer Explanation
                </h2>

                <textarea
                    placeholder="Explain your solution..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />

                <button onClick={handleSubmit}>
                    <FaPaperPlane />
                    Submit Answer
                </button>

            </div>

            <div className="status-box">

                <FaCheckCircle />

                <p>

                    After submission your answer will be sent to the Admin for review.

                </p>

            </div>

        </motion.div>

    );

}