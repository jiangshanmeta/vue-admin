import axios from "./axios.js"

function getTypConfig(){
    return axios.get('/user/typConfig')
}

export {
    getTypConfig,
}