import { apiCLient } from "../ApiCLient"



export const getDepartment = ()=>{
    return apiCLient.get('/api/get-department')
}

export const postDepartment =(data:any)=>{
    return apiCLient.post('/api/post-department',data)
}

export const putDepartment = (data:any)=>{
    return apiCLient.put('/api/put-department',data)
}

export const deleteDepartment = (data:any)=>{
    return apiCLient.put('/api/delete-department',data)
}