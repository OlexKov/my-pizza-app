import { AxiosRequestConfig } from "axios";
import http_common from "../http_common";
import { ICreateEditModel, IPaginationResultModel } from "../components/categories/types";

const formHeader = {headers: {
    'Content-type': 'multipart/form-data'
}}



export const categoryService  = {
    getList:(search:string,page:number,perPage:number,progressEvent:AxiosRequestConfig = {})=> http_common.get<IPaginationResultModel>(`getlist?search=${search}&page=${page}&perPage=${perPage}`,progressEvent),
    getAll:(progressEvent:AxiosRequestConfig = {})=> http_common.get('getall',progressEvent),
    create:(category:ICreateEditModel) => http_common.post<ICreateEditModel>('create',category,formHeader),
    delete:(categoryId:number) => http_common.delete(`delete/${categoryId}`),
    update:(category:ICreateEditModel,id:number) => http_common.post<ICreateEditModel>(`update/${id}`,category,formHeader),
    getById:(categoryId:number) => http_common.get(`get/${categoryId}`),
}