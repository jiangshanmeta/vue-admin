import {
    getStore,
    getSaler,
    getCreateFields,
    createBook,
    getBookList,
} from '@/server/book.js';

import {
    download, 
} from '@/widget/utility.js';

export default {
    fields: {
        customername: {
            labelName: '客户名',
            editorComponent: {
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
            editorComponent: {
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
                component: () => import('@/components/common/Views/ViewTransform').then((rst) => rst.default),
                config: {
                    transform: function (data) {
                        return '¥' + data;
                    },
                },
            },
        },
        address: {
            labelName: '收货地址',
            editorComponent: {
                name: 'EditorBookAddress',
                component: () => import('@/components/book/Editors/EditorBookAddress').then((rst) => rst.default),
                relates: [
                    {
                        relateField: 'customername',
                        propField: 'customername',
                    },
                ],
                default: '',
            },
            view: {
                component: () => import('@/components/common/Views/ViewMarkdown').then((rst) => rst.default),
                config: {
                    breaks: false,
                    // transform:function(data){
                    //     return "¥" + data;
                    // },
                },
            },
        },
        store: {
            labelName: '店铺',
            editorComponent: {
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
            editorComponent: {
                name: 'EditorEnumRelatesSelect',
                config: {
                    isValidValue (data) {
                        return data;
                    },
                    getCandidate: getSaler,
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
                component: () => import('@/components/book/Views/ViewBookTestViewJoin').then((rst) => rst.default),
                config: {
                    glue: ' 的收货地址是 ',
                },
            },
        },
    },
    staticOperators: [
        {
            name: 'StaticOperatorCreate',
            component: () => import('@/components/common/StaticOperators/StaticOperatorCreate').then((rst) => rst.default),
            config: {
                getCreateFields: getCreateFields,
                doCreateRequest: createBook,
                triggerConfig: {
                    text: '新建订单',
                    type: 'primary',
                },
                dialogConfig: {
                    title: '新建订单',
                    width: '800px',
                },
                createBtnConfig: {
                    text: '确认创建',
                    type: 'success',
                },
                cancelBtnConfig: {
                    text: '取消',
                },
            },
        },
        {
            handler (resolve) {
                console.log(this.$attrs.formData);
                console.log(this.$attrs.selectedData);
                console.log(this.data);
                this.$message({
                    type: 'warning',
                    message: '就把选中的取消选中',
                });
                resolve();
            },
            triggerConfig: {
                type: 'danger',
                text: '删除多项',
            },
        },
        {
            name: 'StaticOperatorCsv',
            component: () => import('@/components/common/StaticOperators/StaticOperatorCsv').then((rst) => rst.default),
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
            handler (resolve, data) {
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
    operators: [
        {
            handler (resolve, data) {
                this.$message({
                    message: `${data.customername}再来一单`,
                    type: 'success',
                    duration: 2000,
                });
                setTimeout(() => {
                    resolve();
                }, 1000);
            },
            triggerConfig: {
                text: '再来一单',
                type: 'success',
                size: 'small',
            },
        },
    ],
};
