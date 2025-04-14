import { apiCLient } from "../ApiCLient"


export const getCustomers = ()=>{
    return apiCLient.get('api/get-customers')
}

export const postCustomers = (data:any)=>{
    return apiCLient.post('api/post-customers',data)
}

export const putCustomers = (data:any)=>{
    return apiCLient.put('api/put-customers',data)
}

export const deleteCustomers = (data:any)=>{
    return apiCLient.delete('api/delete-customers',data)
}