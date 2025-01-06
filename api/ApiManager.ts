import axios from 'axios'

export const ApiManager = axios.create({
    baseURL: "http://192.168.5.2:3000/api",
    headers: {
        "Content-Type": "application/json"
    },
    responseType: "json",
})