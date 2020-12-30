export default {
    label: '订单',
    icon: 'el-icon-setting',
    name: 'book',
    pages: [
        {
            path: '/book/index',
            label: '订单列表',
            component: () => import('@/pages/common/MetaPageList'),
            meta: {
                model: 'bookModel',
                title: '订单列表',
            },
        },
        {
            path: '/book/create',
            label: '订单创建',
            component: () => import('@/pages/common/MetaPageCreate'),
            meta: {
                model: 'bookModel',
                title: '订单创建',
            },
        },
    ],
};
