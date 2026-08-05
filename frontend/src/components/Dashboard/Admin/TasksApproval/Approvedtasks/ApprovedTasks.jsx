import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getApprovedTasks } from "../../../../../services/api/adminTask.service";

import "./ApprovedTasks.css";

export default function ApprovedTasks({ refresh }) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        loadTasks();

    }, [refresh]);

    const loadTasks = async () => {

        try {

            const res = await getApprovedTasks();

            setTasks(res.tasks || []);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div id="approvedTasks">

                <h1>Approved Tasks :</h1>

                <p>Loading...</p>

            </div>

        );

    }

    return (

        <div id="approvedTasks">

            <h1>

                Approved Tasks

                <span>

                    {" "}({tasks.length})

                </span>

            </h1>

            <div id="approvedTasksNotify">

                {

                    tasks.length === 0 && (

                        <p>No Approved Task Found</p>

                    )

                }

                {

                    tasks.map((task, index) => (

                        <div

                            key={task._id}

                            className="approvedTasksNotifyList"

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

                            <div className="approvedTasksNotifyContent">

                                <h3>

                                    {task.assignedTo?.firstName}{" "}

                                    {task.assignedTo?.lastName}

                                </h3>

                                <p>

                                    Internship :

                                    {" "}

                                    {task.internship?.title}

                                </p>

                                <p>

                                    Task :

                                    {" "}

                                    {task.title}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}