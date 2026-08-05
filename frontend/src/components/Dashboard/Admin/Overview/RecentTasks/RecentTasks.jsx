import "./RecentTasks.css";

export default function RecentTasks({

    tasks = []

}) {

    const getBadge = (status) => {

        switch (status) {

            case "Submitted":
                return {
                    text: "Pending Review",
                    className: "today"
                };

            case "Approved":
                return {
                    text: "Approved",
                    className: "upcoming"
                };

            case "Incorrect":
                return {
                    text: "Rejected",
                    className: "late"
                };

            default:
                return {
                    text: status,
                    className: "today"
                };

        }

    };

    return (

        <div className="recentTasks">

            <h2>

                Recent Tasks

            </h2>

            {

                tasks.map(task => {

                    const badge = getBadge(task.status);

                    return (

                        <div

                            key={task._id}

                            className="taskCard"

                        >

                            <img
                                src={task.avatar || "/default-avatar.png"}
                                alt={task.student}
                            />

                            <div className="taskInfo">

                                <h3>

                                    {task.title}

                                </h3>

                                <p>

                                    {task.student}

                                </p>

                                <small className={badge.className}>

                                    {badge.text}

                                </small>

                                <small>

                                    {new Date(task.submittedAt).toLocaleDateString()}

                                </small>

                            </div>

                            <div className="taskRight">

                                <span>

                                    {task.status}

                                </span>

                                <small

                                    className={badge.className}

                                >

                                    {badge.text}

                                </small>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}