import { apiCLient } from "../ApiCLient"

export const getVendorsAccount = ()=>{
    return apiCLient.get('/api/get-vendorAccounts')
}

export const postVendorsAccount =(data:any)=>{
    return apiCLient.post('/api/post-vendorsAccounts',data)
}

export const putVendorsAccount = (data:any)=>{
    return apiCLient.put('/api/put-vendorsAccounts',data)
}

export const deleteVendorsAccount = (data:any)=>{
    return apiCLient.put('/api/delete-vendorsAccounts',data)
}