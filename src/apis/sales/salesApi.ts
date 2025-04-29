import { apiCLient } from "../ApiCLient"

export const getSales = ()=>{
    return apiCLient.get('/api/get-sales')
}

export const postSales =(data:any)=>{
    return apiCLient.post('/api/post-sales',data)
}

export const putSales = (data:any)=>{
    return apiCLient.put('/api/put-sales',data)
}

export const deleteSales = (data:any)=>{
    return apiCLient.put('/api/delete-sales',data)
}