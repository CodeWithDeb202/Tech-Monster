import './InternshipCard.css';



export default function InternshipCard({ internships }) {


    return (
        <>
            {internships.map((internship) => (
                <div className="allInternshipsCard">
                    <div id="allInternshipsImg">
                        <div id="intenshipLogo">
                            <img src={internship.img} alt='student profile image' />
                        </div>
                        <div id="editAndDltBtn">
                            <button id='editBtn'>{internship.editBtn}</button>
                            <button id='dltBtn'>{internship.dltBtn}</button>
                        </div>
                    </div>

                    <div id='allInternshipsContent'>
                        <div id="titleAndDesc">
                            <h3>{internship.title}</h3>
                            <p>{internship.description}</p>
                        </div>
                        <div id="totalLessionAndTaskcount">
                            <p>Duration : <span>{internship.duration}</span></p>
                            <p>Total Lession : {internship.totalLession}</p>
                            <p>Total Tasks : {internship.totalTasks}</p>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}