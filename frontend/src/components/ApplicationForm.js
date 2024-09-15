// src/components/ApplicationForm.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { applyForJob } from '../api/jobApi';

const ApplicationForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        years_of_experience: '',
        education: '',
        resume: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }
        await applyForJob(id, form);
        alert('Application submitted successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="number" name="years_of_experience" placeholder="Years of Experience" onChange={handleChange} required />
            <input type="text" name="education" placeholder="Education" onChange={handleChange} required />
            <input type="file" name="resume" onChange={handleChange} required />
            <button type="submit">Submit Application</button>
        </form>
    );
};

export default ApplicationForm;
