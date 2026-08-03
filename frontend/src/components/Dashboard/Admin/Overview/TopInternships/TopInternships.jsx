import "./TopInternships.css";

export default function TopInternships({

    internships=[]

}){

    return(

        <div className="topInternships">

            <h2>

                Top Internships

            </h2>

            {

                internships.map((item)=>(

                    <div

                    className="internshipCard"

                    key={item._id}

                    >

                        <img

                        src={item.thumbnail}

                        alt={item.title}

                        />

                        <div
                        className="internshipInfo">

                            <h3>

                                {item.title}

                            </h3>

                            <p>

                                👨‍🎓 {item.joinedStudents} Students

                            </p>

                            <p>

                                📋 {item.totalTasks} Tasks

                            </p>

                        </div>

                        <div
                        className="internshipRight">

                            <span>

                                {item.level}

                            </span>

                            {

                                item.isPublished ?

                                <small className="published">

                                    Published

                                </small>

                                :

                                <small className="draft">

                                    Draft

                                </small>

                            }

                        </div>

                    </div>

                ))

            }

        </div>

    )

}