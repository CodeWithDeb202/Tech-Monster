import "./ActiveStudents.css";

export default function ActiveStudents({ students = [] }) {

    return (

        <div id="activeStudents">

            <h2>Top Active Students</h2>

            <div id="activeStudentCards">

                {
                    students.length === 0 ? (

                        <p className="emptyStudent">
                            No Active Students
                        </p>

                    ) : (

                        students.map((student) => (

                            <div
                                className="activeStudentCard"
                                key={student._id}
                            >

                                <img
                                    src={student.avatar}
                                    alt={student.fullName}
                                />

                                <div className="studentInfo">

                                    <h4>{student.fullName}</h4>

                                    <span>
                                        {student.internshipTitle}
                                    </span>

                                    <div className="progressBar">

                                        <div
                                            className="progress"
                                            style={{
                                                width: `${student.progress}%`
                                            }}
                                        />

                                    </div>

                                    <small>
                                        {student.progress}% Completed
                                    </small>

                                </div>

                            </div>

                        ))

                    )
                }

            </div>

        </div>

    );

}