import { apiCLient } from "../ApiCLient"

export const getAccounts = ()=>{
    return apiCLient.get('/api/get-Accounts')
}

export const postAccounts =(data:any)=>{
    return apiCLient.post('/api/post-Accounts',data)
}

export const putAccounts = (data:any)=>{
    return apiCLient.put('/api/put-Accounts',data)
}

export const deleteAccounts = (data:any)=>{
    return apiCLient.put('/api/delete-Accounts',data)
}