import axios from "./axios.js"

function getAsyncCandidate(vm,cb){
    if(!vm.uri){
        console.error("async-enum需要配置uri");
        return;
    }
    axios.get(vm.uri).then((json)=>{
        cb(json.data.data);
    })
}

function getRelatesCandidate(vm,data,cb){
    if(!vm.uri){
        console.error("relates-enum需要配置uri");
        return;
    }
    axios.get(vm.uri,{params:data}).then((json)=>{
        cb(json.data.data);
    })
}

function getCreateFields(vm,cb){
    if(!vm.getCreateFieldsUri){
        console.error("创建时使用默认获取字段的方法需要配置getCreateFieldsUri")
        return;
    }
    axios.get(vm.getCreateFieldsUri).then((json)=>{
        cb(json.data.fields);
    })
}

function doCreateRequest(vm,data,cb){
    if(!vm.doCreateUri){
        console.error("创建时使用默认方法需要配置doCreateUri");
        return;
    }
    axios.post(vm.doCreateUri,data).then(()=>{
        cb();
    })
}

function getEditInfo(vm,cb){
    if(!vm.editInfoUri){
        console.error("edit组件需要配置editInfoUri");
        return
    }
    axios.get(`${vm.editInfoUri}/${vm.id}`).then((json)=>{
        cb(json.data.fields);
    })
}

function doEditRequest(vm,data,cb){
    if(!vm.doEditUri){
        console.error("edit组件需要配置doEditUri");
        return;
    }
    axios.post(`${vm.doEditUri}/${vm.id}`,data).then((json)=>{
        cb(json)
    })
}

function doDeleteRequest(vm,cb){
    if(!vm.uri){
        console.error("默认删除方法需要配置uri");
        return;
    }
    axios.post(`${vm.uri}/${vm.id}`).then(()=>{
        cb();
    })
}

function getDetailInfo(vm,cb){
    axios.get(`${vm.uri}/${vm.id}`).then((json)=>{
        cb(json.data.fields);
    })
}

function getListInfo(vm,data,cb){
    if(!vm.baseUrl){
        return;
    }
    axios.get(`${vm.baseUrl}`,{params:data}).then((json)=>{
        cb(json.data);
    })
}

export {
    getAsyncCandidate,
    getRelatesCandidate,
    getCreateFields,
    doCreateRequest,
    getEditInfo,
    doEditRequest,
    doDeleteRequest,
    getDetailInfo,
    getListInfo,
}