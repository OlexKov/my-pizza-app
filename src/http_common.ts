import axios from "axios";
import { apiUrl } from "./helpers/constants";

const http_common = axios.create({
    baseURL: apiUrl,
    headers:{
        'Content-Type':'application/json'
    }
});

export default http_common;