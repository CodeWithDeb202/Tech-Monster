import './PendingTaskApprove.css';
// import { useState } from 'react';

export default function PendingTaskApprove() {

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
            <div id="pendingTasksApprove">
                <h1>Pending :</h1>
                <div id="pendingTasksApproveNotify">
                    {updates.map((update, index) => (
                        <div className="pendingTasksApproveNotifyList">
                            <div className='recentSerielNum'>
                                <p>{index + 1}</p>
                            </div>
                            <div className='pendingTasksApproveNotifyContent'>
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