import axios from "axios"
const getToken =()=>{
    const token = localStorage.getItem("token")
    console.log({token});
    return token
}

export const baseUrl = "http://localhost:3000"
const token = getToken()
export const apiCLient = axios.create({
    baseURL:baseUrl,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        Authorization: `Bearer ${token}`
        
    }
})