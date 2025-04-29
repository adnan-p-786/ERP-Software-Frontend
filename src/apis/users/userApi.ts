import { apiCLient } from "../ApiCLient"

export const getUser = ()=>{
    return apiCLient.get('/api/get-user')
}

