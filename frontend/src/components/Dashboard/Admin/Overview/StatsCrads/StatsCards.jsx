// import { useEffect } from 'react';
import './StatsCards.css';

import {
    HiUserGroup,
    HiFolder,
    HiFire,
    HiClock
} from "react-icons/hi";

export default function StatsCards() {

    const cards = [
        {
            icon: <HiUserGroup />,
            title: "Total students",
            value: 0
        },
        {
            icon: <HiFolder />,
            title: "All internship",
            value: 0
        },
        {
            icon: <HiFire />,
            title: "Active student",
            value: 0
        },
        {
            icon: <HiClock />,
            title: "Pending Approval",
            value: 0
        },
    ]



    return (
        <>
            <div id="adminStatsCrads">
                {cards.map((card) => (
                    <div id="adminStatsCard">
                        {card.icon}
                        <h3>{card.title}</h3>
                        <p>{card.value}</p>
                    </div>
                ))}
            </div>
        </>
    )
}