import './InternshipsForm.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import {FiArrowLeft} from 'react-icons/fi'

export default function InternshipsForm() {
    const {formData, setFormData} = useState({
        img: '',
        title: '',
        description: '',
        duration: '',
        totalLession: 0,
        totalTasks: 0,
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Add successfully");
    }
    return(
        <>

            <div id="internshipsForm">
                <div id="backOption">
                    <Link to={'/demo_admin/internships'}>
                        <FiArrowLeft />
                    </Link>

                    <h1>Intenrship Add Form</h1>
                </div>
                <form onSubmit={handleSubmit} >
                    <div id="formGroup">
                        <label htmlFor="img">Choose a internships logo</label>
                        <input type="file" name='img' id='img' onChange={handleInputChange}/>
                    </div>
                    <div id="formGroup">
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' id='title' placeholder='Enter Title' onChange={handleInputChange} />
                    </div>
                    <div id="formGroup">
                        <label htmlFor="description">Description</label>
                        <input type="text" name='description' id='description' placeholder='Enter description' onChange={handleInputChange}/>
                    </div>
                    <div id="formGroup">
                        <label htmlFor="duration">Duration</label>
                        <input type="text" name='duration' id='duration' placeholder='Enter duration' onChange={handleInputChange}/>
                    </div>
                    <div id="formGroup">
                        <label htmlFor="totalLession">Total Lession</label>
                        <input type="number" name='totalLession' id='totalLession' placeholder='Enter totalLession' onChange={handleInputChange} />
                    </div>
                    <div id="formGroup">
                        <label htmlFor="totalTasks">Total Tasks</label>
                        <input type="number" name='totalTasks' id='totalTasks' placeholder='Enter totalTasks' onChange={handleInputChange} />
                    </div>

                    <button type='submit'>Add Internships</button>
                </form>
            </div>
        </>
    )
}