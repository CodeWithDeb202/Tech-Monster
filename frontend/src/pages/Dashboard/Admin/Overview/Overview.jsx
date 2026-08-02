import './Overview.css';

import RecentUpdates from '../../../../components/Dashboard/Admin/Overview/RecentUpdates';
import StatsCards from '../../../../components/Dashboard/Admin/Overview/StatsCrads';
import ActiveStudents from '../../../../components/Dashboard/Admin/Overview/ActiveStudents';
import LineChart from '../../../../components/Dashboard/Admin/Overview/LineChart';

export default function Overview() {
    return(
        <>
            <RecentUpdates />
            <StatsCards />
            <ActiveStudents />
            <LineChart />
        </>
    )
}