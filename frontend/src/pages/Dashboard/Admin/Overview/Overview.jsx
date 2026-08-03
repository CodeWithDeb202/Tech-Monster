import { useEffect, useState } from "react";

import "./Overview.css";

import api from "../../../../services/api/axios";
import { API } from "../../../../services/api/endpoints";

import WelcomeCard from '../../../../components/Dashboard/Admin/Overview/WelcomeCard';
import ServerStatus from '../../../../components/Dashboard/Admin/Overview/ServerStatus';
import StatsCards from "../../../../components/Dashboard/Admin/Overview/StatsCards";
import ActiveStudents from "../../../../components/Dashboard/Admin/Overview/ActiveStudents";
import LineChart from "../../../../components/Dashboard/Admin/Overview/LineChart";
import AttendanceSummary from '../../../../components/Dashboard/Admin/Overview/AttendanceSummary';
import TopInternships from "../../../../components/Dashboard/Admin/Overview/TopInternships";
import RecentTasks from "../../../../components/Dashboard/Admin/Overview/RecentTasks";
import CertificateAnalytics from "../../../../components/Dashboard/Admin/Overview/CertificateAnalytics";
import QuickActions from "../../../../components/Dashboard/Admin/Overview/QuickActions";
import RecentActivities from "../../../../components/Dashboard/Admin/Overview/RecentActivities";

import FadeInSection from "../../../../components/Dashboard/common/FadeInSection";

export default function Overview() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const { data } = await api.get(API.DASHBOARD.ADMIN);

            setDashboard(data.dashboard);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading Dashboard...</h2>;

    }

    if (!dashboard) {
        return <h2>Dashboard data not found.</h2>;
    }

    return (

        <>

            <div className="overviewContainer">

                <div className="overviewTop">

                    <FadeInSection>

                        <WelcomeCard

                            stats={dashboard.stats}

                        />

                    </FadeInSection>

                    <FadeInSection>

                        <ServerStatus />

                    </FadeInSection>

                </div>

                <FadeInSection>

                    <StatsCards

                        stats={dashboard.stats}

                    />

                </FadeInSection>

                <div className="overviewChart">

                    <FadeInSection>

                        <LineChart

                            chartData={dashboard.weeklyAttendance}

                        />

                    </FadeInSection>

                    <FadeInSection>

                        <AttendanceSummary

                            attendanceSummary={dashboard.attendanceSummary}

                        />

                    </FadeInSection>

                </div>

                <div className="overviewMiddle">

                    <FadeInSection>

                        <RecentActivities

                            activities={dashboard.recentActivities}

                        />

                    </FadeInSection>

                    <FadeInSection>

                        <ActiveStudents

                            students={dashboard.activeStudents}

                        />

                    </FadeInSection>

                </div>

                <div className="overviewBottom">

                    <FadeInSection>

                        <TopInternships

                            internships={dashboard.topInternships}

                        />

                    </FadeInSection>

                    <FadeInSection>

                        <RecentTasks

                            tasks={dashboard.recentTasks}

                        />

                    </FadeInSection>

                </div>

                <div className="overviewFooter">

                    <FadeInSection>

                        <CertificateAnalytics

                            analytics={dashboard.certificateAnalytics}

                        />

                    </FadeInSection>

                    <FadeInSection>

                        <QuickActions />

                    </FadeInSection>

                </div>

            </div>

        </>

    );

}