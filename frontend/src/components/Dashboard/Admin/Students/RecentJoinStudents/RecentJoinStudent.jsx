import './RecentJoinStudent.css';

import StudentCard from '../../StudentCard';

import logoImg from '../../../../../assets/logo/logo.png';

export default function RecentJoinStudent() {
    
    const students = [
        {
            img: logoImg,
            name: 'Debabrata',
            joinedInternship: 0,
            lessionLeft: 0,
            tasksLeft: 0
        },
        {
            img: logoImg,
            name: 'Debabrata',
            joinedInternship: 0,
            lessionLeft: 0,
            tasksLeft: 0
        },
        {
            img: logoImg,
            name: 'Debabrata',
            joinedInternship: 0,
            lessionLeft: 0,
            tasksLeft: 0
        },
        {
            img: logoImg,
            name: 'Debabrata',
            joinedInternship: 0,
            lessionLeft: 0,
            tasksLeft: 0
        }
    ]


    return (
        <>
            <div id="recentJoinStudent">
                <h1>Recent Joined Students :</h1>
                <div id="recenJoinStudentsCards">
                    <StudentCard students={students} />
                </div>
            </div>
        </>
    )
}