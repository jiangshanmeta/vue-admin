import axios from "./axios.js"

function getAsyncCandidate(cb){
    if(!this.uri){
        console.error("async-enum需要配置uri");
        return;
    }
    axios.get(this.uri).then((json)=>{
        cb(json.data.data);
    })
}

function getRelatesCandidate(cb,data){
    if(!this.uri){
        console.error("relates-enum需要配置uri");
        return;
    }
    axios.get(this.uri,{params:data}).then((json)=>{
        cb(json.data.data);
    })
}

function getListInfo(cb,data){
    if(!this.baseUrl){
        return;
    }
    axios.get(`${this.baseUrl}`,{params:data}).then((json)=>{
        cb(json.data);
    })
}

export {
    getAsyncCandidate,
    getRelatesCandidate,
    getListInfo,
}