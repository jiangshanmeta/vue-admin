export default {
    label: '首页',
    icon: 'el-icon-menu',
    name: 'index',
    pages: [
        {
            path: '/',
            redirect: '/index/index',
            menuHide: true,
        },
        {
            path: '/index/login',
            component: () => import('@/pages/index/Login'),
            menuHide: true,
            meta: {
                title: '登录',
            },
        },

        {
            path: '/index/index',
            label: '个人中心',
            component: () => import('@/pages/index/Index'),
            menuHide: true,
            meta: {
                title: '个人中心',
            },
        },

        // 都没匹配上 404页面
        {
            path: '*',
            component: () => import('@/pages/index/404'),
            menuHide: true,
        },

    ],
};
