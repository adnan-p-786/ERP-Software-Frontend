import { apiCLient } from "../ApiCLient"

export const getExpenseType = ()=>{
    return apiCLient.get('api/get-expenseType')
}

export const postExpenseType = (data:any)=>{
    return apiCLient.post('api/post-expenseType',data)
}

export const putExpenseType = (data:any)=>{
    return apiCLient.put('/api/put-expenseType',data)
}

export const deleteExpenseType = (data:any)=>{
    return apiCLient.delete('/api/delete-expenseType',data)
}