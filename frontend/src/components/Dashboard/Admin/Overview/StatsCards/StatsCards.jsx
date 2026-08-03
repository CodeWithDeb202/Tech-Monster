import "./StatsCards.css";

// import CountUp from "react-countup";

import {
    HiUserGroup,
    HiFolder,
    HiFire,
    HiBadgeCheck,
    HiClipboardList,
    HiCalendar
} from "react-icons/hi";

export default function StatsCards({ stats }) {

    const cards = [

        {
            icon: <HiUserGroup />,
            title: "Total Students",
            value: stats.totalStudents
        },

        {
            icon: <HiFolder />,
            title: "Internships",
            value: stats.totalInternships
        },

        {
            icon: <HiFire />,
            title: "Active Students",
            value: stats.activeStudents
        },

        {
            icon: <HiBadgeCheck />,
            title: "Certificates",
            value: stats.totalCertificates
        },

        {
            icon: <HiClipboardList />,
            title: "Tasks",
            value: stats.totalTasks
        },

        {
            icon: <HiCalendar />,
            title: "Attendance",
            value: stats.totalAttendance
        }

    ];

    return (

        <div id="adminStatsCards">

            {

                cards.map((card, index) => (

                    <div

                        className="adminStatsCard"

                        key={index}

                    >

                        <div className="cardIcon">

                            {card.icon}

                        </div>

                        <div className="cardInfo">

                            <h4>

                                {card.title}

                            </h4>

                            <h2>

                                {card.value}

                            </h2>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}