function doLogin(data){
    let rst = {
        data:{
            token:"admin",
        },
        rstno:1,
    }
    return Promise.resolve(rst)
}

function doLogout(){
    let rst = {
        data:{
            msg:"登出成功",
        },
        rstno:1,
    }
    return Promise.resolve(rst);
}

function getUserInfo(){
    let rst = {
        data:{
            name:"不萌的山山",
            privilege:[1,2,3,5,7,10,233,999]
        },
        rstno:1
    };
    return Promise.resolve(rst)
}

export {
    doLogin,
    doLogout,
    getUserInfo,
}