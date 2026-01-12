import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8382/api",
  withCredentials: true, // optional (cookies use ho to)
});

export default api;