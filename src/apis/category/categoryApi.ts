import { apiCLient } from "../ApiCLient"



export const getCategory = ()=>{
    return apiCLient.get('/api/get-categories')
}

export const postCategory =(data:any)=>{
    return apiCLient.post('/api/post-categories',data)
}