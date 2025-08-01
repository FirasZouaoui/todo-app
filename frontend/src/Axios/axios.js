import axios from "axios"
const instance = axios.create({
    baseURL:"http://backend:8080/api"
})
export default instance

