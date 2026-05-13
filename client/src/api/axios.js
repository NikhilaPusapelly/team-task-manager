import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-vrdg.onrender.com/api",
});

export default API;