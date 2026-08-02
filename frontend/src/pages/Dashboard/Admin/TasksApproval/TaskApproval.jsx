import ApprovedTasks from '../../../../components/Dashboard/Admin/TasksApproval/Approvedtasks';
import PendingTaskApprove from '../../../../components/Dashboard/Admin/TasksApproval/PendingTaskApprove';
import './TaskApproval.css';

export default function TaskApproval() {
    return(
        <>
            <PendingTaskApprove />
            <ApprovedTasks />
        </>
    )
}