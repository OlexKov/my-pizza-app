import axios from "axios";

export const categoryService  ={
    getAll:()=> axios.get('http://127.0.0.1:8000/api' + '/getall'),
    create:(category:FormData) => axios.post('http://127.0.0.1:8000/api/create',category,{headers: {
        
        'Content-type': 'multipart/form-data'
    }}),
}