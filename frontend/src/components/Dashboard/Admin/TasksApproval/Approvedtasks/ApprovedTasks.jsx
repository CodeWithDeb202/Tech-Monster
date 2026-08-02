import './ApprovedTasks.css';
// import { useState } from 'react';

export default function ApprovedTasks() {

    const updates = [
        {
            title: "username1",
            description: "What is doing on my website",
        },
        {
            title: "username2",
            description: "What is doing on my website",
        },
        {
            title: "username3",
            description: "What is doing on my website",
        },
        {
            title: "username4",
            description: "What is doing on my website",
        }
    ]

    return (
        <>
            <div id="approvedTasks">
                <h1>Approved tasks :</h1>
                <div id="approvedTasksNotify">
                    {updates.map((update, index) => (
                        <div className="approvedTasksNotifyList">
                            <div className='recentSerielNum'>
                                <p>{index + 1}</p>
                            </div>
                            <div className='approvedTasksNotifyContent'>
                                <h3>{update.title}</h3>
                                <p>{update.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}