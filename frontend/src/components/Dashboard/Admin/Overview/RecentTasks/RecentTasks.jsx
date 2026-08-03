import "./RecentTasks.css";

export default function RecentTasks({

    tasks = []

}) {

    const getBadge = (date) => {

        const today = new Date();

        const due = new Date(date);

        const diff = Math.ceil(

            (due - today) /

            (1000 * 60 * 60 * 24)

        );

        if (diff < 0) {

            return {

                text: "Late",

                className: "late"

            };

        }

        if (diff === 0) {

            return {

                text: "Today",

                className: "today"

            };

        }

        return {

            text: "Upcoming",

            className: "upcoming"

        };

    };

    return (

        <div className="recentTasks">

            <h2>

                Recent Tasks

            </h2>

            {

                tasks.map(task => {

                    const badge = getBadge(task.dueDate);

                    return (

                        <div

                            key={task._id}

                            className="taskCard"

                        >

                            <img

                                src={task.avatar}

                                alt="student"

                            />

                            <div className="taskInfo">

                                <h3>

                                    {task.title}

                                </h3>

                                <p>

                                    {task.student}

                                </p>

                                <small>

                                    {task.internship}

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