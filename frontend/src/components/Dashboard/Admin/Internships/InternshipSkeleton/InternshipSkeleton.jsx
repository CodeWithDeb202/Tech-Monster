import "./InternshipSkeleton.css";


export default function InternshipSkeleton() {


    return (

        <div className="skeleton-wrapper">


            {
                [1, 2, 3, 4].map(i => (

                    <div
                        className="skeleton-card"
                        key={i}
                    >


                        <div className="skeleton-img"></div>


                        <div className="line"></div>


                        <div className="small-line"></div>


                    </div>


                ))

            }


        </div>

    )

}