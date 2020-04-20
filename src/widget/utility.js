
const toString = Object.prototype.toString;

function isAsyncFunction (func) {
    return toString.call(func) === '[object AsyncFunction]';
}

function enumArr2Hash (arr, label = 'label', value = 'value') {
    return arr.reduce((obj, item) => {
        obj[item[value]] = item[label];
        return obj;
    }, {});
}

function logError (e) {
    console && console.log && console.log(e);
}

function onceAsync (fn) {
    let promise;
    return function (cb, ...args) {
        if (promise === undefined) {
            promise = new Promise((resolve) => {
                fn(resolve, ...args);
            });
        }
        promise.then(cb);
    };
}

function deepFreeze (obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(function (name) {
        const prop = obj[name];
        if (prop !== null && typeof prop === 'object') { deepFreeze(prop); }
    });
    return Object.freeze(obj);
}

function hasOwnProperty (target, key) {
    return Object.prototype.hasOwnProperty.call(target, key);
}

export {
    isAsyncFunction,
    enumArr2Hash,
    logError,
    onceAsync,
    deepFreeze,
    hasOwnProperty,
};
