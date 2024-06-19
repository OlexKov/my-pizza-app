import axios from "axios";
import { apiUrl } from "../helpers/constants";

const formHeader = {headers: {
    'Content-type': 'multipart/form-data'
}}

export const categoryService  ={
    getAll:()=> axios.get(apiUrl + 'getall'),
    create:(category:FormData) => axios.post(apiUrl+'create',category,formHeader),
    delete:(categoryId:number) => axios.delete(apiUrl + `delete/${categoryId}`),
    update:(category:FormData,id:number) => axios.post<FormData>(apiUrl + `update/${id}`,category,formHeader),
    getById:(categoryId:number) => axios.get(apiUrl + `get/${categoryId}`),
}