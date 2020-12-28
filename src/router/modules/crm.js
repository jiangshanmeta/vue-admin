export default {
    label: '客户',
    icon: 'el-icon-share',
    name: 'crm',
    pages: [
        {
            path: '/crm/index',
            component: () => import('@/pages/common/MetaList'),
            label: '客户列表',
            meta: {
                model: 'userModel',
                title: '客户列表',
            },
        },

    ],
};
