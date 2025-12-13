import axios from 'axios'

const API_BASE =  'http://127.0.0.1:8000/api';

const api  = axios.create({
    baseURL: API_BASE,
    withCredentials:true,
    // headers:{
    //     'Content-Type':'application/json',
    // }
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('error',error.response?.data || error.message)
        return Promise.reject(error)
    }
)

export default api;