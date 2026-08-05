import "./WelcomeCard.css";

import {
    HiUserGroup,
    HiCalendar,
    HiAcademicCap
} from "react-icons/hi";

export default function WelcomeCard({ stats }) {

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (

        <div className="welcomeCard">

            <div className="welcomeLeft">

                <h1>

                    Welcome Back 👋

                </h1>

                <p>

                    Manage your internship platform from one place.

                </p>

                <span>

                    {today}

                </span>

            </div>

            <div className="welcomeRight">

                <div className="miniCard">

                    <HiUserGroup />

                    <div>

                        <h3>

                            {stats.totalStudents}

                        </h3>

                        <p>

                            Students

                        </p>

                    </div>

                </div>

                <div className="miniCard">

                    <HiAcademicCap />

                    <div>

                        <h3>

                            {stats.activeInternships}

                        </h3>

                        <p>

                            Active Internships

                        </p>

                    </div>

                </div>

                <div className="miniCard">

                    <HiCalendar />

                    <div>

                        <h3>

                            {stats.submittedTasks}

                        </h3>

                        <p>

                            Pending Reviews

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}