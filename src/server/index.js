function doLogin (data) {
    const rst = {
        data: {
            token: 'admin',
        },
        rstno: 1,
    };
    return Promise.resolve(rst);
}

function doLogout () {
    const rst = {
        data: {
            msg: '登出成功',
        },
        rstno: 1,
    };
    return Promise.resolve(rst);
}

function getUserInfo () {
    const rst = {
        data: {
            name: '不萌的山山',
        },
        rstno: 1,
    };
    return Promise.resolve(rst);
}

export {
    doLogin,
    doLogout,
    getUserInfo,
};
