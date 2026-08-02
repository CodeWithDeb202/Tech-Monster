import './StudentCard.css';



export default function StudentCard({students}) {

    

    return (
        <>
            {students.map((student) => (
                <div id="StudentCard">
                    <div id="StudentprofileImg">
                        <img src={student.img} alt='student profile image' />
                        <p>joined intenship : {student.joinedInternship}</p>
                    </div>

                    <div id='StudentCardContent'>
                        <h3>{student.name}</h3>
                        <div id="lessonAndTaskcount">
                            <p>Lession left : {student.lessionLeft}</p>
                            <p>Tasks Left : {student.tasksLeft}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}