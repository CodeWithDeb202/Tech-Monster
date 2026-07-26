import './Dashboard.css';

import { useEffect, useState } from "react";

import DashboardHeader from "../../../../components/Dashboard/Student/Dashboard/DashboardHeader";
import ContinueLearning from "../../../../components/Dashboard/Student/Dashboard/ContinueLearning";
import AllCourses from "../../../../components/Dashboard/Student/Dashboard/AllCourses";

function Dashboard() {

    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {

        const move = (e) => {

            setPosition({
                x: e.clientX,
                y: e.clientY,
            });

        };

        window.addEventListener("mousemove", move);

        return () => window.removeEventListener("mousemove", move);

    }, []);

    return (

        <div className="dashboard-page">
            <div
                className="mouse-light"
                style={{
                    left: position.x,
                    top: position.y,
                }}
            />

            <DashboardHeader />
            <ContinueLearning />
            <AllCourses />

        </div>

    )

}

export default Dashboard;