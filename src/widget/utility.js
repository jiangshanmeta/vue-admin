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

export {
    isAsyncFunction,
    enumArr2Hash,
    logError,
}