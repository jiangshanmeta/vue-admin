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

function getCreateFields(cb){
    if(!this.getCreateFieldsUri){
        console.error("创建时使用默认获取字段的方法需要配置getCreateFieldsUri")
        return;
    }
    axios.get(this.getCreateFieldsUri).then((json)=>{
        cb(json.data.fields);
    })
}

function doCreateRequest(cb,data){
    if(!this.doCreateUri){
        console.error("创建时使用默认方法需要配置doCreateUri");
        return;
    }
    axios.post(this.doCreateUri,data).then(()=>{
        cb();
    })
}

function getEditInfo(cb){
    if(!this.editInfoUri){
        console.error("edit组件需要配置editInfoUri");
        return
    }
    axios.get(`${this.editInfoUri}/${this.id}`).then((json)=>{
        cb(json.data.fields);
    })
}

function doEditRequest(cb,data){
    if(!this.doEditUri){
        console.error("edit组件需要配置doEditUri");
        return;
    }
    axios.post(`${this.doEditUri}/${this.id}`,data).then((json)=>{
        cb(json)
    })
}

function doDeleteRequest(cb){
    if(!this.uri){
        console.error("默认删除方法需要配置uri");
        return;
    }
    axios.post(`${this.uri}/${this.id}`).then(()=>{
        cb();
    })
}

function getDetailInfo(cb){
    axios.get(`${this.uri}/${this.id}`).then((json)=>{
        cb(json.data.fields);
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
    getCreateFields,
    doCreateRequest,
    getEditInfo,
    doEditRequest,
    doDeleteRequest,
    getDetailInfo,
    getListInfo,
}