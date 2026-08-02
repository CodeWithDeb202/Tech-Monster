import './Allstudents.css';

import StudentCard from '../../StudentCard';
import logoImg from '../../../../../assets/logo/logo.png';


export default function Allstudents() {

    
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
        },
    ]
    return (
        <>
            <div id="AllStudents">
                <h1>All Students :</h1>
                <div id="AllStudentCards">
                    <StudentCard students={students} />
                </div>
            </div>
        </>
    )
}