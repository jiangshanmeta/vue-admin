export default {
    label: '测试',
    icon: 'el-icon-menu',
    name: 'test',
    pages: [
        {
            path: '/test/test_basic',
            label: '基础editor',
            component: () => import('@/pages/test/TestBasic'),
        },
        {
            path: '/test/test_enum',
            label: '枚举editor',
            component: () => import('@/pages/test/TestEnum'),
        },
        {
            path: '/test/test_tag',
            label: '多选editor',
            component: () => import('@/pages/test/TestTag'),
        },
        {
            path: '/test/test_filter',
            label: '筛选',
            component: () => import('@/pages/test/TestFilter'),
        },

        {
            path: '/test/test_upload',
            label: '上传editor',
            component: () => import('@/pages/test/TestUpload'),
        },
    ],
};
