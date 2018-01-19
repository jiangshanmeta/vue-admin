const toString = Object.prototype.toString

function isAsyncFunction(func){
    return toString.call(func) === '[object AsyncFunction]';
}


function enumArr2Hash(arr,label='label',value='value'){
    return arr.reduce((obj,item)=>{
        obj[item[value]] = item[label];
        return obj;
    },{})
}

function logError(e){
    console && console.log && console.log(e);
}

function download(data,name="template",options){
    if(typeof data === 'string'){
        data = [data];
    }
    let blob = new Blob(data,options);
    let href = URL.createObjectURL(blob);
    let dom = document.createElement("a");
    dom.href = href;
    dom.download = name;
    dom.click();
    URL.revokeObjectURL(href);
}


export {
    isAsyncFunction,
    enumArr2Hash,
    logError,
    download,
}