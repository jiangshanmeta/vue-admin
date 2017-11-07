import axios from "./axios.js"

function doLogin(data){
    return axios.post('/index/doLogin',data)
}

function doLogout(){
    return axios.post('/index/doLogout')
}

function getUserInfo(){
    return axios.get('/index/getUserInfo')
}

export {
    doLogin,
    doLogout,
    getUserInfo,
}