import './RecentUpdates.css';
// import { useState } from 'react';

export default function RecentUpdates() {

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
            <div id="recentUpdates">
                <h1>Recent Updates :</h1>
                <div id="recentNotification">
                    {updates.map((update, index) => (
                        <div className="recentNotificationList">
                            <div className='recentSerielNum'>
                                <p>{index + 1}</p>
                            </div>
                            <div className='recentNotificationContent'>
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