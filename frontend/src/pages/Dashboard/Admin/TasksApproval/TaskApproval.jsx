import { useState } from "react";

import ApprovedTasks from "../../../../components/Dashboard/Admin/TasksApproval/ApprovedTasks";
import PendingTaskApprove from "../../../../components/Dashboard/Admin/TasksApproval/PendingTaskApprove";

import "./TaskApproval.css";

export default function TaskApproval() {

    const [refresh, setRefresh] = useState(0);

    const reload = () => {

        setRefresh(prev => prev + 1);

    };

    return (
        <>
            <PendingTaskApprove

                refresh={refresh}

            />

            <ApprovedTasks

                refresh={refresh}

            />

        </>
    );

}