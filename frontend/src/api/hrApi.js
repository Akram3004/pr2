// src/api/hrApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';  // Django Backend URL

export const fetchApplicants = async (jobId) => {
    const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}/applicants/`);
    return response.data;
};

export const addJob = async (jobData) => {
    const response = await axios.post(`${API_BASE_URL}/jobs/`, jobData);
    return response.data;
};
