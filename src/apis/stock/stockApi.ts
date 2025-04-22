import { apiCLient } from "../ApiCLient"

export const getStocks = ()=>{
    return apiCLient.get('/api/get-stocks')
}

export const postStocks =(data:any)=>{
    return apiCLient.post('/api/post-stocks',data)
}

export const putStocks = (data:any)=>{
    return apiCLient.put('/api/put-stocks',data)
}

export const deleteStocks = (data:any)=>{
    return apiCLient.put('/api/delete-stocks',data)
}