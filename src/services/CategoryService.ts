import axios from "axios";
import { apiUrl } from "../helpers/constants";

export const categoryService  ={
    getAll:()=> axios.get(apiUrl + 'getall'),
    create:(category:FormData) => axios.post(apiUrl+'create',category,{headers: {
        'Content-type': 'multipart/form-data'
    }}),
}