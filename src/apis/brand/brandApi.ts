import { apiCLient } from "../ApiCLient"

export const getBrand = ()=>{
    return apiCLient.get('api/get-brand')
}

export const postBrand = (data:any)=>{
    return apiCLient.post('api/post-brand',data)
}

export const putBrand = (data:any)=>{
    return apiCLient.put('api/put-brand',data)
}

export const deleteBrand = (data:any)=>{
    return apiCLient.delete('api/delete-brand',data)
}