import { AxiosRequestConfig } from "axios";
import http_common from "../http_common";

const formHeader = {headers: {
    'Content-type': 'multipart/form-data'
}}

export const categoryService  = {
    getAll:(progressEvent:AxiosRequestConfig = {})=> http_common.get('getall',progressEvent),
    create:(category:FormData) => http_common.post('create',category,formHeader),
    delete:(categoryId:number) => http_common.delete(`delete/${categoryId}`),
    update:(category:FormData,id:number) => http_common.post<FormData>(`update/${id}`,category,formHeader),
    getById:(categoryId:number) => http_common.get(`get/${categoryId}`),
}