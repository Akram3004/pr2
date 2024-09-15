// src/components/HRDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchApplicants } from '../api/hrApi';

const HRDashboard = ({ jobId }) => {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const loadApplicants = async () => {
            const applicantData = await fetchApplicants(jobId);
            setApplicants(applicantData);
        };
        loadApplicants();
    }, [jobId]);

    return (
        <div>
            <h1>HR Dashboard - Applicants</h1>
            <ul>
                {applicants.map((applicant) => (
                    <li key={applicant.id}>
                        <p>{applicant.name} - {applicant.match_score}% match</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HRDashboard;
