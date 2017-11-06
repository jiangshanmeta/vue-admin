import axios from "./axios.js"

function getAsyncCandidate(vm,cb){
    axios.get(vm.uri).then((json)=>{
        cb(json.data.data);
    })
}

function getRelatesCandidate(vm,data,cb){
    axios.get(vm.uri,{params:data}).then((json)=>{
        cb(json.data.data)
    })
}

export {
    getAsyncCandidate,
    getRelatesCandidate,
}