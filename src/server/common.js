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

function getEditInfo(vm,cb){
    axios.get(`${vm.editLink}/${vm.id}`).then((json)=>{
        cb(json.data.fields);
    })
}

function doEdit(vm,data,cb){
    axios.post(`${vm.doEditLink}/${vm.id}`,data).then((json)=>{
        cb(json)
    })
}

function doDelete(vm,cb){
    axios.post(`${vm.uri}/${vm.id}`).then(()=>{
        cb();
    })
}

function getDetailInfo(vm,cb){
    axios.get(`${vm.uri}/${vm.id}`).then((json)=>{
        cb(json.data.fields);
    })
}

export {
    getAsyncCandidate,
    getRelatesCandidate,
    getCreateInfo,
    doCreate,
    getEditInfo,
    doEdit,
    doDelete,
    getDetailInfo,
}