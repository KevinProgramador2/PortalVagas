import axios from 'axios';

const api = axios.create({
  baseURL: "https://portal-de-vagas-db.onrender.com",
});

export default api;
