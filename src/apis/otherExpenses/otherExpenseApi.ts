import { apiCLient } from "../ApiCLient"

export const getOtherExpenses = ()=>{
    return apiCLient.get('/api/get-otherExpenses')
}

export const postOtherExpenses =(data:any)=>{
    return apiCLient.post('/api/post-otherExpenses',data)
}

export const putOtherExpenses = (data:any)=>{
    return apiCLient.put('/api/put-otherExpenses',data)
}

export const deleteOtherExpenses = (data:any)=>{
    return apiCLient.delete('/api/delete-otherExpenses',data)
}