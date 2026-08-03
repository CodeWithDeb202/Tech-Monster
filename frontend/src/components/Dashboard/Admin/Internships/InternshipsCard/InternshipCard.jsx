import { useNavigate } from "react-router-dom";
import {
    FiEdit2,
    FiTrash2
} from "react-icons/fi";

import useScrollAnimation from "../../../../../hooks/useScrollAnimation";

import "./InternshipCard.css";



function SingleInternshipCard({
    item,
    onDelete
}) {


    const navigate = useNavigate();


    const animation = useScrollAnimation();



    return (

        <div

            ref={animation.ref}

            className={`
                allInternshipsCard
                ${animation.className}
            `}

        >



            <div className="cardImage">


                <img

                    src={item.thumbnail}

                    alt={item.title}

                />



                <div className="cardActions">


                    <button

                        onClick={() =>
                            navigate(
                                "/admin/internships-form",
                                {
                                    state: {
                                        internshipData: item
                                    }
                                }
                            )
                        }

                    >

                        <FiEdit2 />

                    </button>




                    <button

                        onClick={() =>
                            onDelete(item._id)
                        }

                    >

                        <FiTrash2 />

                    </button>


                </div>


            </div>




            <h3>
                {item.title}
            </h3>



            <p>
                {item.description}
            </p>



            <div className="meta">


                <span>
                    Level : {item.level}
                </span>



                <span>
                    Tasks : {item.totalTasks}
                </span>



            </div>



        </div>

    )

}





export default function InternshipCard({
    internships,
    onDelete
}) {


    return (

        <>

            {
                internships.map(item => (

                    <SingleInternshipCard

                        key={item._id}

                        item={item}

                        onDelete={onDelete}

                    />

                ))
            }


        </>

    )

}