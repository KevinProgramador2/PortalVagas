import api from './api';

export const getJobs = () => api.get('/jobs');

export const getJobById = (id) => api.get(`/jobs/${id}`);

export const createJob = (jobData) => api.post('/jobs', { ...jobData, createdAt: new Date().toISOString() });

export const updateJob = (id, jobData) => api.put(`/jobs/${id}`, { ...jobData, updatedAt: new Date().toISOString() });

export const deleteJob = (id) => api.delete(`/jobs/${id}`);

export const getCurriculum = () => api.get('/curriculum');

export const createCurriculum = (curriculumData) => api.post('/curriculum', curriculumData);

export const updateCurriculum = (id, curriculumData) => api.put(`/curriculum/${id}`, curriculumData);

export const deleteCurriculum = (id) => api.delete(`/curriculum/${id}`);
