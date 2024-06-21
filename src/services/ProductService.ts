import { AxiosRequestConfig } from "axios";
import http_common from "../http_common";

const formHeader = {headers: {
    'Content-type': 'multipart/form-data'
}}

export const productService  = {
    getAll:(progressEvent:AxiosRequestConfig = {})=> http_common.get('products',progressEvent),
    
}