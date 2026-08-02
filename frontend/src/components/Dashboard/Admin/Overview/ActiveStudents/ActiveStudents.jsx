import './ActiveStudents.css';

import StudentCard from '../../StudentCard';

import logoImg from '../../../../../assets/logo/logo.png';


export default function ActiveStudents() {

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
            <div id="activeStudents">
                <h1>Active Students :</h1>
                <div id="activeStudentCards">
                    <StudentCard students={students} />
                </div>
            </div>
        </>
    )
}