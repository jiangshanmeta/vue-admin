export default {
    label: '首页',
    icon: 'el-icon-menu',
    name: 'index',
    pages: [
        {
            path: '/',
            redirect: '/index/index',
            meta: {
                menuHide: true,
            },
        },
        {
            path: '/index/login',
            component: () => import('@/pages/index/login'),
            meta: {
                title: '登录',
                menuHide: true,
            },
        },
        {
            path: '/index/404',
            component: () => import('@/pages/index/404'),
            meta: {
                menuHide: true,
            },
        },

        // 类似于路由表的默认规则
        {
            path: '*',
            redirect: '/index/404',
            meta: {
                menuHide: true,
            },
        },

        {
            path: '/index/index',
            label: '个人中心',
            component: () => import('@/pages/index/index'),
            meta: {
                privilege: [
                    1,
                ],
                title: '个人中心',
            },
        },

    ],
}
