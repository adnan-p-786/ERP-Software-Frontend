import { apiCLient } from "../ApiCLient"

export const getRoles = ()=>{
    return apiCLient.get('/api/get-roles')
}

export const postRoles =(data:any)=>{
    return apiCLient.post('/api/post-roles',data)
}

export const putRoles = (data:any)=>{
    return apiCLient.put('/api/put-roles',data)
}

export const deleteRoles = (data:any)=>{
    return apiCLient.put('/api/delete-roles',data)
}