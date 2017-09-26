const toString = Object.prototype.toString

function isAsyncFunction(func){
    return toString.call(func) === '[object AsyncFunction]';
}

export {
    isAsyncFunction,
}