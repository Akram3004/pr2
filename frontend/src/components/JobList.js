// src/components/JobList.js
import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../api/jobApi';
import { Link } from 'react-router-dom';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const loadJobs = async () => {
            const jobData = await fetchJobs();
            setJobs(jobData);
        };
        loadJobs();
    }, []);

    return (
        <div>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
