import { apiCLient } from "../ApiCLient"


export const getCustomerAccounts = ()=>{
    return apiCLient.get('api/get-customerAccounts')
}

export const postCustomerAccounts = (data:any)=>{
    return apiCLient.post('api/post-customerAccounts',data)
}

export const putCustomerAccounts = (data:any)=>{
    return apiCLient.put('api/put-customerAccounts',data)
}

export const deleteCustomerAccounts = (data:any)=>{
    return apiCLient.delete('api/delete-customerAccounts',data)
}