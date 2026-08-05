import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPendingTasks } from "../../../../../services/api/adminTask.service";
import { socket } from "../../../../../socket/socket";

import "./PendingTaskApprove.css";

export default function PendingTaskApprove({ refresh }) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        loadTasks();

    }, [refresh]);

    useEffect(() => {

        socket.on("taskSubmitted", () => {

            loadTasks();

        });

        return () => {

            socket.off("taskSubmitted");

        };

    }, []);

    const loadTasks = async () => {

        try {

            const res = await getPendingTasks();

            setTasks(res.tasks || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div id="pendingTasksApprove">

                <h1>Pending :</h1>

                <p>Loading...</p>

            </div>

        );

    }

    return (

        <div id="pendingTasksApprove">

            <h1>

                Pending :

                <span>

                    {" "}({tasks.length})

                </span>

            </h1>

            <div id="pendingTasksApproveNotify">

                {

                    tasks.length === 0 && (

                        <p>

                            No Pending Task Found

                        </p>

                    )

                }

                {

                    tasks.map((task, index) => (

                        <div

                            key={task._id}

                            className="pendingTasksApproveNotifyList"

                            onClick={() =>

                                navigate(

                                    `/admin/tasks/${task._id}`

                                )

                            }

                        >

                            <div className="recentSerielNum">

                                <p>

                                    {index + 1}

                                </p>

                            </div>

                            <div className="pendingTasksApproveNotifyContent">

                                <h3>

                                    {

                                        task.assignedTo?.firstName

                                    }{" "}

                                    {

                                        task.assignedTo?.lastName

                                    }

                                </h3>

                                <p>

                                    Internship :

                                    {" "}

                                    {

                                        task.internship?.title

                                    }

                                </p>

                                <p>

                                    Task :

                                    {" "}

                                    {

                                        task.title

                                    }

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}