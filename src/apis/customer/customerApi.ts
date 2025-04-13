import { apiCLient } from "../ApiCLient"


export const getCustomer = ()=>{
    return apiCLient.get('/get-customers')
}

export const postCustomer = ()=>{
    return apiCLient.post('/post-customers')
}

export const putCustomer = ()=>{
    return apiCLient.put('/put-customers')
}

export const deleteCustomer = ()=>{
    return apiCLient.delete('/delete-customers')
}