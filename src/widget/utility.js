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

import fileSaver from 'file-saver';

function download(blob,name="template",options){
    if(!(blob instanceof Blob)){
        if(typeof blob === 'string'){
            blob = [blob];
        }
        blob = new Blob(blob,options);
    }

    fileSaver.saveAs(blob,name);
}


export {
    isAsyncFunction,
    enumArr2Hash,
    logError,
    download,
}