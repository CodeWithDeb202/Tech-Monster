import './Dashboard.css';

import { useEffect, useState } from "react";

import DashboardHeader from "../../../../components/Dashboard/Student/Dashboard/DashboardHeader";
import ContinueLearning from "../../../../components/Dashboard/Student/Dashboard/ContinueLearning";
import AllInternship from "../../../../components/Dashboard/Student/Dashboard/AllInternship";
import api from "../../../../services/api/axios";
import { API } from "../../../../services/api/endpoints";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const { data } = await api.get(API.DASHBOARD.STUDENT);

                setDashboard(data.dashboard);

            } catch (err) {

                console.log("Error:", err);
                console.log("Response:", err.response);
                console.log("Status:", err.response?.status);
                console.log("Data:", err.response?.data);

            }

        };

        loadDashboard();

    }, []);

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
            <ContinueLearning
                internships={dashboard?.internships || []}
            />
            <AllInternship
                internships={
                    dashboard?.allInternship || []
                }
            />

        </div>

    )

}

export default Dashboard;