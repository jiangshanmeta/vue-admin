import axios from "./axios.js"

function getAsyncCandidate(vm,cb){
    axios.get(vm.uri).then((json)=>{
        cb(json.data.data);
    })
}

function getRelatesCandidate(vm,data,cb){
    axios.get(vm.uri,{params:data}).then((json)=>{
        cb(json.data.data);
    })
}

function getCreateInfo(vm,cb){
    axios.get(vm.createLink).then((json)=>{
        cb(json.data.fields);
    })
}

function doCreate(vm,data,cb){
    axios.post(vm.doCreateLink,data).then(()=>{
        cb();
    })
}

function getEditInfo(){

}

function doEdit(){

}

function doDelete(){

}

export {
    getAsyncCandidate,
    getRelatesCandidate,
    getCreateInfo,
    doCreate,
    getEditInfo,
    doEdit,
    doDelete,
}