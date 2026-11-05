import axios from "axios";
import { toast} from "react-hot-toast";

const api = axios.create(
    {
        baseURL: "http://localhost:3000/api",
        withCredentials : true
    }
)

api.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        toast.error("Error in API request")
        return Promise.reject(error)
    }
)

export default api