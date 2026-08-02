import './AllInternships.css';

import {Link} from 'react-router-dom';

import logoImg from '../../../../../assets/logo/logo.png'
import InternshipCard from '../InternshipsCard';


import {FiEdit2, FiDroplet} from 'react-icons/fi';


export default function AllInternships() {


    const internships = [
        {
            img: logoImg,
            title: "ReactJS",
            description: "React is a frontend framework",
            duration: 0,
            totalLession: 0,
            totalTasks: 0,
            editBtn: <FiEdit2 />,
            dltBtn: <FiDroplet />,
        },
        {
            img: logoImg,
            title: "ReactJS",
            description: "React is a frontend framework",
            duration: 0,
            totalLession: 0,
            totalTasks: 0,
            editBtn: <FiEdit2 />,
            dltBtn: <FiDroplet />,
        },
        {
            img: logoImg,
            title: "ReactJS",
            description: "React is a frontend framework",
            duration: 0,
            totalLession: 0,
            totalTasks: 0,
            editBtn: <FiEdit2 />,
            dltBtn: <FiDroplet />,
        },
        {
            img: logoImg,
            title: "ReactJS",
            description: "React is a frontend framework",
            duration: 0,
            totalLession: 0,
            totalTasks: 0,
            editBtn: <FiEdit2 />,
            dltBtn: <FiDroplet />,
        },
        {
            img: logoImg,
            title: "ReactJS",
            description: "React is a frontend framework",
            duration: 0,
            totalLession: 0,
            totalTasks: 0,
            editBtn: <FiEdit2 />,
            dltBtn: <FiDroplet />,
        },
        {
            img: logoImg,
            title: "ReactJS",
            description: "React is a frontend framework",
            duration: 0,
            totalLession: 0,
            totalTasks: 0,
            editBtn: <FiEdit2 />,
            dltBtn: <FiDroplet />,
        },
        {
            img: logoImg,
            title: "ReactJS",
            description: "React is a frontend framework",
            duration: 0,
            totalLession: 0,
            totalTasks: 0,
            editBtn: <FiEdit2 />,
            dltBtn: <FiDroplet />,
        },
        {
            img: logoImg,
            title: "ReactJS",
            description: "React is a frontend framework",
            duration: 0,
            totalLession: 0,
            totalTasks: 0,
            editBtn: <FiEdit2 />,
            dltBtn: <FiDroplet />,
        },
    ]

    return (
        <>
            <div id="allInternships">
                <div id="allInternshipsHeader">
                    <h1>All Internships :</h1>
                    <Link to={'/demo_admin/internships-form'}>Add internsships</Link>
                </div>
                <div id="allInternshipsCards">
                    <InternshipCard internships={internships} />
                </div>
            </div>

        </>
    )
}