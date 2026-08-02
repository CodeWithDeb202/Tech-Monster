import './Students.css';

import RecentJoinStudent from '../../../../components/Dashboard/Admin/Students/RecentJoinStudents';
import AllStudents from '../../../../components/Dashboard/Admin/Students/AllStudents';

export default function Students() {
    return(
        <>
            <RecentJoinStudent />
            <AllStudents />
        </>
    )
}