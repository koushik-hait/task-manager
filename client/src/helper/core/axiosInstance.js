import axios from "axios"
import {API} from "../../backend"


export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `${API}`
 })