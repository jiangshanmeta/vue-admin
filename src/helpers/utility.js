const toString = Object.prototype.toString

function isAsyncFunction(func){
    return toString.call(func) === '[object AsyncFunction]';
}

function noop(){

}

export {
    isAsyncFunction,
    noop,
}