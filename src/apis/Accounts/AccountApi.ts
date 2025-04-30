import { apiCLient } from "../ApiCLient"
const token = localStorage.getItem('token');

export const getAccounts = ()=>{
    return apiCLient.get('/api/get-Accounts'),{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}

export const postAccounts =(data:any)=>{
    return apiCLient.post('/api/post-Accounts',data),{
        headers: {
          Authorization: `Bearer ${token}`,
        }
    }
}

export const putAccounts = (data:any)=>{
    return apiCLient.put('/api/put-Accounts',data)
}

export const deleteAccounts = (data:any)=>{
    return apiCLient.put('/api/delete-Accounts',data)
}