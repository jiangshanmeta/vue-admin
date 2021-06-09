const importUserModel = () => import('@/models/userModel');

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
                model: importUserModel,
                title: '客户列表',
            },
        },
        {
            path: '/crm/detail',
            component: () => import('@/pages/common/MetaPageInfo'),
            menuHide: true,
            meta: {
                model: importUserModel,
                title: '客户详情',
            },
        },
        {
            path: '/crm/edit',
            component: () => import('@/pages/common/MetaPageEdit'),
            menuHide: true,
            meta: {
                model: importUserModel,
                title: '客户编辑',
            },
        },

    ],
};
