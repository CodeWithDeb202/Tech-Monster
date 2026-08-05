import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import {
    getTaskDetails,
    approveTask,
    rejectTask
} from "../../../../../services/api/adminTask.service";

import "./TaskApprovalDetails.css";

export default function TaskApprovalDetails() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [task, setTask] = useState(null);

    const [comment, setComment] = useState("");

    useEffect(() => {

        loadTask();

    }, []);

    const loadTask = async () => {

        try {

            const res = await getTaskDetails(id);

            setTask(res.task);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const handleApprove = async () => {

        try {

            await approveTask(id, comment);

            toast.success("Task Approved");

            navigate("/admin/tasks", {
                replace: true
            });

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Something went wrong"

            );

        }

    };

    const handleReject = async () => {

        try {

            await rejectTask(id, comment);

            toast.success("Task Rejected");

            navigate("/admin/tasks");

        }

        catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Something went wrong"

            );

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <motion.div

            className="taskApprovalDetails"

            initial={{ opacity: 0, y: 40 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .5 }}

        >

            <motion.div

                className="taskDetailsCard"

                initial={{ opacity: 0, scale: .95 }}

                animate={{ opacity: 1, scale: 1 }}

                transition={{ delay: .2 }}

            >

                <h1>

                    Student Task Details

                </h1>

                <div className="detailRow">

                    <span>Student</span>

                    <p>

                        {task.assignedTo.firstName}{" "}

                        {task.assignedTo.lastName}

                    </p>

                </div>

                <div className="detailRow">

                    <span>Username</span>

                    <p>

                        {task.assignedTo.username}

                    </p>

                </div>

                <div className="detailRow">

                    <span>Email</span>

                    <p>

                        {task.assignedTo.email}

                    </p>

                </div>

                <div className="detailRow">

                    <span>Internship</span>

                    <p>

                        {task.internship.title}

                    </p>

                </div>

                <div className="detailRow">

                    <span>Task</span>

                    <p>

                        {task.title}

                    </p>

                </div>

                <div className="detailRow">

                    <span>Description</span>

                    <p>

                        {task.description}

                    </p>

                </div>

                <div className="detailRow">

                    <span>Github</span>

                    <a

                        href={task.githubLink}

                        target="_blank"

                        rel="noreferrer"

                    >

                        {task.githubLink || "-"}

                    </a>

                </div>

                <div className="detailRow">

                    <span>Live</span>

                    <a

                        href={task.liveLink}

                        target="_blank"

                        rel="noreferrer"

                    >

                        {task.liveLink || "-"}

                    </a>

                </div>

                <div className="detailRow">

                    <span>Answer</span>

                    <pre>

                        {task.answer || "-"}

                    </pre>

                </div>

                <div className="detailRow">

                    <span>Code</span>

                    <pre>

                        {task.code || "-"}

                    </pre>

                </div>

                <textarea

                    placeholder="Admin Comment..."

                    value={comment}

                    onChange={(e) =>

                        setComment(e.target.value)

                    }

                />

                <div className="approvalButtons">

                    <motion.button

                        whileHover={{

                            scale: 1.05

                        }}

                        whileTap={{

                            scale: .95

                        }}

                        className="approveBtn"

                        onClick={handleApprove}

                    >

                        Approve

                    </motion.button>

                    <motion.button

                        whileHover={{

                            scale: 1.05

                        }}

                        whileTap={{

                            scale: .95

                        }}

                        className="rejectBtn"

                        onClick={handleReject}

                    >

                        Incorrect

                    </motion.button>

                </div>

            </motion.div>

        </motion.div>

    );

}