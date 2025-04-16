import { apiCLient } from "../ApiCLient"

export const getExpense = ()=>{
    return apiCLient.get('api/get-expenses')
}

export const postExpense = (data:any)=>{
    return apiCLient.post('api/post-expenses',data)
}

export const putExpense = (data:any)=>{
    return apiCLient.put('/api/put-expenses',data)
}

export const deleteExpense = (data:any)=>{
    return apiCLient.delete('/api/delete-expenses',data)
}