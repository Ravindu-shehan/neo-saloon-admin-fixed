import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: "/backend-api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data);
    console.log("Status:", error.response?.status);

    toast.error(
      error.response?.data?.message || "Something went wrong"
    );

    return Promise.reject(error);
  }
);

export default api;

