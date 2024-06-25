import { AxiosRequestConfig } from "axios";
import http_common from "../http_common";
import { ICategorySearch, ICreateEditModel, IPaginationResultModel } from "../components/categories/types";
import QueryString from "qs";

const formHeader = {headers: {
    'Content-type': 'multipart/form-data'
}}



export const categoryService  = {
    getList:(search:ICategorySearch,progressEvent:AxiosRequestConfig = {})=>{
        const queryParams:string = QueryString.stringify(search)
      return   http_common.get<IPaginationResultModel>('getlist?'+ queryParams,progressEvent)
    },
    getAll:(progressEvent:AxiosRequestConfig = {})=> http_common.get('getall',progressEvent),
    create:(category:ICreateEditModel) => http_common.post<ICreateEditModel>('create',category,formHeader),
    delete:(categoryId:number) => http_common.delete(`delete/${categoryId}`),
    update:(category:ICreateEditModel,id:number) => http_common.post<ICreateEditModel>(`update/${id}`,category,formHeader),
    getById:(categoryId:number) => http_common.get(`get/${categoryId}`),
}