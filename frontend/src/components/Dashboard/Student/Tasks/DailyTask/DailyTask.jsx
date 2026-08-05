import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { submitTask, getSingleTask } from "../../../../../services/api/adminTask.service";
import {
    FaClock,
    FaPaperPlane,
    FaCheckCircle,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

import CodeEditor from "../CodeEditor";

import "./DailyTask.css";

export default function DailyTask() {
    const { taskId } = useParams();


    const [answer, setAnswer] = useState("");
    const [code, setCode] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [liveLink, setLiveLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState(null);

    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {

        loadTask();

    }, [taskId]);

    const loadTask = async () => {

        try {

            const res = await getSingleTask(taskId);

            setTask(res.task);

            setCode(

                res.task.code || ""

            );

            setAnswer(

                res.task.answer || ""

            );

            setGithubLink(

                res.task.githubLink || ""

            );

            setLiveLink(

                res.task.liveLink || ""

            );

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSubmit = async () => {

        try {

            setLoading(true);

            await submitTask(

                taskId,

                {

                    code,

                    answer,

                    githubLink,

                    liveLink

                }

            );

            toast.success(

                "Task Submitted Successfully"

            );

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Submission Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <motion.div

            className="daily-page"

            initial={{ opacity: 0, y: 40 }}

            animate={{ opacity: 1, y: 0 }}

        >

            <div className="daily-header">

                <h1>

                    {task?.internship?.title}

                </h1>

                <p>

                    {task?.title}

                </p>

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
                <motion.div

                    className="question-card"

                    whileHover={{

                        y: -5

                    }}

                >

                    <h2>

                        {task?.title}

                    </h2>

                    <p>

                        {task?.description}

                    </p>

                </motion.div>
            </div>

            <div className="answer-section">

                <h2>Write Your Code</h2>

                <CodeEditor
                    language="javascript"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                />

                <input

                    type="text"

                    placeholder="Github Repository Link"

                    value={githubLink}

                    onChange={(e) =>

                        setGithubLink(e.target.value)

                    }

                />

                <input

                    type="text"

                    placeholder="Live Project Link"

                    value={liveLink}

                    onChange={(e) =>

                        setLiveLink(e.target.value)

                    }

                />

                <h2 style={{ marginTop: "25px" }}>
                    Answer Explanation
                </h2>

                <textarea
                    placeholder="Explain your solution..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />

                <button

                    onClick={handleSubmit}

                    disabled={loading}

                >

                    {

                        loading

                            ?

                            "Submitting..."

                            :

                            <>

                                <FaPaperPlane />

                                Submit Answer

                            </>

                    }

                </button>

            </div>

            <div className="status-box">

                <FaCheckCircle />

                <p>

                    Review Status :

                    {" "}

                    {

                        task?.reviewStatus

                    }

                </p>

            </div>

        </motion.div>

    );

}