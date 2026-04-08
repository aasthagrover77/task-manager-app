import axios from "axios";

const API = axios.create({
 baseURL: "https://task-manager-backend-6q0j.onrender.com",
});

export default API;