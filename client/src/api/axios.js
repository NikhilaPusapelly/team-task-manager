import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-backend-vs0e.onrender.com/api",
});

export default API;