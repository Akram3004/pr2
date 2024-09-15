// src/components/JobDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobDetail } from '../api/jobApi';

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const loadJob = async () => {
            const jobData = await fetchJobDetail(id);
            setJob(jobData);
        };
        loadJob();
    }, [id]);

    if (!job) return <p>Loading...</p>;

    return (
        <div>
            <h1>{job.title}</h1>
            <p>{job.description}</p>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <Link to={`/jobs/${id}/apply`}>Apply for this job</Link>
        </div>
    );
};

export default JobDetail;
