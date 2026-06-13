import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || window?.location?.origin || "http://localhost:3000").replace(/\/$/, "")
const api = axios.create({
    baseURL: `${API_BASE_URL}/api/auth`,
    withCredentials: true
})

export async function register({username, email,password}) {
    try{
        const response = await api.post('/register',{
            username,email,password
        },{
            // isse server has access to read any data in cookies
            withCredentials: true
        })
        
        return response.data;
    
    } catch (err) {
        console.log(err)
    } 

}

export async function login({email,password}) {

    try{
        const response = await api.post("/login",{
            email,password
        })

        return response.data;

    }catch(err){
        console.log(err);
    }
}

export async function getMe() {
    try{
        const response = await api.get("/get-me")
        return response.data; 
    }catch (err) {
        console.log(err)
    }
}

export async function logout() {

    try{
        const response = await api.get("/logout")
        return response.data;

    }catch(err){
        console.log(err);
    }
}
