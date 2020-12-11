import {
    getStore,
    getSaler,
    getCreateFields,
    createBook,
    getBookList,
} from '@/server/book';

import {
    download,
} from '@/widget/download';

export default {
    fields: {
        customername: {
            labelName: '客户名',
            editor: {
                name: 'EditorString',
                config: {
                    placeholder: '请输入客户名',
                },
                createConfig: {
                    placeholder: '测试createconfig',
                },
                default: '',
            },
            view: {
                join: [
                    'id',
                ],
                handler (record) {
                    return `${record.customername}(${record.id})`;
                },
            },
        },
        totalprice: {
            labelName: '金额',
            editor: {
                name: 'EditorNumber',
                relates: [
                    {
                        relateField: [
                            'customername', 'address',
                        ],
                        handler (info) {
                            console.log(info);
                            if (info.customername === 'lelouch' && info.address === 'area11') {
                                this.$emit('input', 0);
                            }
                        },
                        config: {
                            immediate: true,
                        },
                    },
                ],
                default: 0,
            },
            view: {
                component: () => import('@/components/common/Views/ViewTransform'),
                config: {
                    transform: function (data) {
                        return '¥' + data;
                    },
                },
            },
        },
        address: {
            labelName: '收货地址',
            editor: {
                name: 'EditorBookAddress',
                component: () => import('@/components/book/Editors/EditorBookAddress'),
                relates: [
                    {
                        relateField: 'customername',
                        propField: 'customername',
                    },
                ],
                default: '',
            },
            view: {
                component: () => import('@/components/common/Views/ViewMarkdown'),
                config: {
                    breaks: false,
                },
            },
        },
        store: {
            labelName: '店铺',
            editor: {
                name: 'EditorEnumAsyncSelect',
                config: {
                    getCandidate: getStore,
                    labelfield: 'storename',
                    valuefield: '_id',
                },
                default: '',
            },
        },
        saler: {
            labelName: '销售',
            editor: {
                name: 'EditorEnumRelatesSelect',
                config: {
                    isValidValue (data) {
                        return data.store !== '';
                    },
                    getCandidate: getSaler,
                    handleRelateDataChange (relateData) {
                        console.log(relateData);
                    },
                },
                relates: [
                    {
                        relateField: [
                            'store',
                        ],
                        propField: 'relateData',
                    },
                ],

                default: '',
            },
        },
        nameAddress: {
            labelName: '用户名&收货地址',
            view: {
                join: {
                    customername: 'name',
                    address: 'position',
                },
                component: () => import('@/components/book/Views/ViewBookTestViewJoin'),
                config: {
                    glue: ' 的收货地址是 ',
                },
            },
        },
    },
    collectionOperators: [
        {
            name: 'CollectionOperatorCreate',
            component: () => import('@/components/common/CollectionOperators/CollectionOperatorCreate'),
            config: {
                getCreateFields: getCreateFields,
                doCreateRequest: createBook,
                fieldLayout: [
                    [
                        'customername', 'totalprice',
                    ],
                    [
                        'address',
                    ],
                    [
                        'store', 'saler',
                    ],
                ],
                triggerConfig: {
                    text: '新建订单',
                    type: 'primary',
                },
                dialogConfig: {
                    title: '新建订单',
                    width: '800px',
                },
                confirmBtnConfig: {
                    text: '确认创建',
                    type: 'success',
                },
                cancelBtnConfig: {
                    text: '取消',
                },
            },
        },
        {
            handler (data, {
                filterData,
                selectedData,
                pagination,
            }) {
                console.log(data);
                console.log(filterData);
                console.log(selectedData);
                console.log(pagination);

                this.$message({
                    type: 'warning',
                    message: '就把选中的取消选中',
                });
                this.$emit('update');
            },
            triggerConfig: {
                type: 'danger',
                text: '删除多项',
            },
        },
        {
            name: 'CollectionOperatorCsv',
            component: () => import('@/components/common/CollectionOperators/CollectionOperatorCsv'),
            config: {
                triggerConfig: {
                    text: '导入csv数据',
                    type: 'warning',
                },
                handleData: function (resolve, data) {
                    console.log(data);
                    resolve();
                },
            },
        },
        {
            handler (data) {
                const keys = [
                    'customername', 'totalprice', 'address',
                ];
                const rst = data.map((item) => {
                    return keys.map((key) => {
                        return item[key];
                    }).join(',');
                }).join('\r\n');

                download(rst, 'template.csv');
            },
            triggerConfig: {
                text: '下载CSV',
                type: 'primary',
            },

        },
    ],
    listConfig: {
        selection: true,
        listRequest: getBookList,
        paginated: false,
    },
    filters: [
        {
            label: '客户名',
            field: 'customername',
            filterComponent: {
                name: 'EditorString',
                config: {
                    placeholder: '请输入客户名',
                },
                default: '',
            },
        },
        {
            label: '金额',
            field: 'totalprice',
            filterComponent: {
                name: 'EditorNumber',
                default: 500,
            },
            relates: [
                {
                    relateField: 'customername',
                    handler (customername) {
                        console.log(customername);
                        if (customername === 'lelouch') {
                            this.$emit('input', 2333);
                        }
                    },
                    config: {
                        immediate: true,
                    },
                },
            ],
        },
    ],
    documentOperators: [
        {
            handler (data) {
                this.$message({
                    message: `${data.customername}再来一单`,
                    type: 'success',
                    duration: 2000,
                });
                setTimeout(() => {
                    this.$emit('update');
                }, 1000);
            },
            triggerConfig: {
                text: '再来一单',
                type: 'success',
                size: 'small',
            },
        },
        {
            name: 'DocumentOperatorLink',
            component: () => import('@/components/common/DocumentOperators/DocumentOperatorLink'),
            config: {
                tag: 'el-button',
                getLink (data) {
                    return data.customername;
                },
                getText: '搜索地址',
                triggerConfig: {
                    size: 'small',
                    type: 'primary',
                },
            },
        },

    ],
};
