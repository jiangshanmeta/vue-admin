export default {
    label: '客户',
    icon: 'el-icon-share',
    name: 'crm',
    pages: [
        {
            path: '/crm/index',
            component: () => import('@/pages/common/MetaPageList'),
            label: '客户列表',
            meta: {
                model: 'userModel',
                title: '客户列表',
            },
        },
        {
            path: '/crm/detail',
            component: () => import('@/pages/common/MetaPageInfo'),
            menuHide: true,
            meta: {
                model: 'userModel',
                title: '客户详情',
            },
        },
    ],
};
