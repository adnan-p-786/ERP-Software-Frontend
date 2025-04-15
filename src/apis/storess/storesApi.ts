import { apiCLient } from "../ApiCLient"


export const getstores = ()=>{
    return apiCLient.get('/api/get-stores')
}

export const poststores =(data:any)=>{
    return apiCLient.post('/api/post-stores',data)
}

export const putstores = (data:any)=>{
    return apiCLient.put('/api/put-stores',data)
}

export const deletestores = (data:any)=>{
    return apiCLient.put('/api/delete-stores',data)
}