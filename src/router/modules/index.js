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
            path: '/index/404',
            component: () => import('@/pages/index/404'),
            menuHide: true,
        },

        // 类似于路由表的默认规则
        {
            path: '*',
            redirect: '/index/404',
            menuHide: true,
        },

        {
            path: '/index/index',
            label: '个人中心',
            component: () => import('@/pages/index/Index'),
            meta: {
                title: '个人中心',
            },
        },

    ],
};
