// src/api/jobApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';  // Django Backend URL

export const fetchJobs = async () => {
    const response = await axios.get(`${API_BASE_URL}/jobs/`);
    return response.data;
};

export const fetchJobDetail = async (jobId) => {
    const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}/`);
    return response.data;
};

export const applyForJob = async (jobId, applicationData) => {
    const response = await axios.post(`${API_BASE_URL}/jobs/${jobId}/apply/`, applicationData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
