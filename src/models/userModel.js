import {
    genderEnum,
    typHash,
    getPrivilege,
    getCreateFields,
    createUser,
    getUserList,
    getUserDetail,
    getEditUserInfo,
    editUser,
    delUser,
    getTypEnum,
} from '@/server/user'

import {
    onceAsync,
} from '@/widget/utility'

const cacheGetTypEnum = onceAsync(getTypEnum)

export default function () {
    return {
        field_list: {
            name: {
                label: '用户名',
                editorComponent: {
                    name: 'field_string2',
                    component: () => import('@/components/common/editor/editor_string').then((rst) => rst.default),
                    config: {
                        placeholder: '请输入用户名',
                    },
                    editConfig: {
                        placeholder: '测试editconfig',
                    },
                    default: '3',
                },
                view: {
                    handler (data, config) {
                        // console.log(this);
                        return config.prefix + data
                    },
                    config: {
                        prefix: '用户名',
                    },
                },
                validator: [
                    {
                        validator: function (rule, value, cb) {
                            if (value.length < 2) {
                                cb([
                                    new Error('姓名最少两个字符'),
                                ])
                            } else {
                                cb()
                            }
                        },
                    },
                ],
            },
            password: {
                label: '密码',
                editorComponent: {
                    name: 'editor_pwd',
                    config: {
                        placeholder: '请输入密码',
                        relates: [
                            {
                                relateField: [
                                    'name',
                                ],
                                handler (info) {
                                    console.log(info)
                                    if (info.name === 'lelouch') {
                                        this.$emit('input', 0)
                                    }
                                },
                                config: {
                                    immediate: true,
                                },
                            },
                        ],

                    },
                    default: '',
                },
                validator: [
                    {
                        validator (rule, value, cb) {
                            if (value.length > 15) {
                                cb([
                                    new Error('密码位数最多为15位'),
                                ])
                            } else {
                                cb()
                            }
                        },
                    },

                ],
            },
            gender: {
                label: '性别',
                editorComponent: {
                    name: 'editor_gender',
                    default: 0,
                },
                view: {
                    name: 'view_enum2',
                    component: () => import('@/components/common/views/view_enum').then((rst) => rst.default),
                    config: {
                        enums: genderEnum,
                    },
                },
                tip () {
                    return '暂不支持LGBT'
                },
                tableColumnConfig: {
                    align: 'center',
                },
                labelComponent: {
                    default: {
                        name: 'label_redstar',
                        component: () => import('@/components/user/labels/label_redstar').then((rst) => rst.default),
                        exclude: [
                            'create',
                        ],
                    },
                    info: {
                        name: 'label_redstar',
                        component: () => import('@/components/user/labels/label_redstar').then((rst) => rst.default),
                    },

                },

            },
            typ: {
                label: '类型',
                editorComponent: {
                    name: 'editor_enum_select_async',
                    config: {
                        getCandidate: cacheGetTypEnum,
                        valuefield: 'value',
                        labelfield: 'label',
                        getModelValue (data) {
                            return data.index
                        },
                        setModelValue (data) {
                            return {
                                index: data,
                            }
                        },
                    },
                    default () {
                        return {
                            index: 0,
                        }
                    },
                },
                view: {
                    name: 'view_enum',
                    component: () => import('@/components/common/views/view_enum').then((rst) => rst.default),
                    config: {
                        enums: typHash,
                    },
                    getViewValue (data) {
                        return data.index
                    },
                },
            },
            privilege: {
                label: '权限',
                editorComponent: {
                    name: 'editor_array_checkbox_relates',
                    config: {
                        getCandidate: getPrivilege,
                        labelfield: 'name',
                        valuefield: 'id',
                        relates: [
                            {
                                relateField: [
                                    'typ',
                                ],
                                isValidValue (value, field) {
                                    if (field === 'typ') {
                                        value = value.index
                                        return value !== 0
                                    }
                                    return true
                                },
                                getCacheKey (value, field) {
                                    if (field === 'typ') {
                                        return value.index
                                    }
                                    return value
                                },
                                propField: 'relateData',
                            },
                        ],
                    },
                    default () {
                        return [
                        ]
                    },
                },
                colspan: {
                    create: 3,
                    edit: 3,
                },
            },
            desc: {
                label: '备注',
                editorComponent: {
                    name: 'editor_textrich',
                    default: '这是富文本编辑器蛤',
                },
                view: {
                    name: 'view_html',
                    component: () => import('@/components/common/views/view_html').then((rst) => rst.default),
                },
                colspan: {
                    default: {
                        label: 1,
                        field: 3,
                        // exclude:['edit'],
                    },
                    create: 3,
                    edit: 3,
                    info: {
                        label: 2,
                        field: 2,
                    },
                },
            },
        },
        staticOperators: [
            {
                name: 'create',
                component: () => import('@/components/common/staticOperators/create').then((rst) => rst.default),
                config: {
                    getCreateFields: getCreateFields,
                    doCreateRequest: createUser,
                    triggerConfig: {
                        text: '新建用户',
                        type: 'primary',
                    },
                    dialogConfig: {
                        title: '新建用户',
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

        ],
        filters: [
            {
                label: '姓名',
                field: 'username',
                editorComponent: {
                    name: 'editor_string',
                    config: {
                        placeholder: '请输入用户姓名',
                    },
                    default: '',
                },
            },
            {
                label: '类型',
                field: 'typ',
                editorComponent: {
                    name: 'filter_enum_select_async',
                    config: {
                        getCandidate: cacheGetTypEnum,
                        allvalue: -1,
                        alllabel: '全部',
                    },
                    default: -1,
                },
            },
            {
                label: '权限',
                field: 'privilege',
                editorComponent: {
                    name: 'filter_enum_select_relates',
                    config: {
                        getCandidate: getPrivilege,
                        valuefield: 'id',
                        labelfield: 'name',
                        placeholder: '请选择权限',
                        allvalue: 'all',
                        alllabel: '不限',
                        relates: [
                            {
                                relateField: [
                                    'typ',
                                ],
                                invalidValue: {
                                    typ: -1,
                                },
                                requestField: {
                                    typ: 'req_typ',
                                },
                                propField: 'relateData',
                            },
                        ],
                        handleInvalidRelateIds () {
                            this.$emit('input', 'all')
                        },

                    },
                    default: 'all',
                },
            },
            {
                label: '自定义filter',
                field: 'test',
                editorComponent: {
                    name: 'test_custom_filter',
                    config: {
                        msg: '测试自定义filter',
                    },
                    component: () => import('@/components/user/test_custom_filter').then((rst) => rst.default),
                    default: 'test',
                },
                watch: true,
            },
        ],
        filterOperators: [
            {
                name: 'reset',
                component: () => import('@/components/common/filterOperators/reset').then((rst) => rst.default),
            },
        ],
        listConfig: {
            listRequest: getUserList,
            sortFields: [
                'typ',
            ],
            paginationConfig: {
                layout: 'total, sizes, prev, pager, next, jumper',
                pageSizes: [
                    2, 10, 20, 30, 50,
                ],
            },

        },
        operators: [
            {
                name: 'info',
                component: () => import('@/components/common/operators/info').then((rst) => rst.default),
                config: {
                    getDetailInfo: getUserDetail,
                    triggerConfig: {
                        text: '查看详情',
                        size: 'small',
                        type: 'primary',
                    },
                    dialogConfig: {
                        title: '用户详情',
                    },
                },
            },
            {
                name: 'edit',
                component: () => import('@/components/common/operators/edit').then((rst) => rst.default),
                config: {
                    getEditInfo: getEditUserInfo,
                    doEditRequest: editUser,
                    autoValidate: false,
                    reserveFields: [
                        'id',
                    ],
                    triggerConfig: {
                        text: '编辑',
                        size: 'small',
                        type: 'primary',
                    },
                    dialogConfig: {
                        title: '编辑用户',
                    },
                    editBtnConfig: {
                        type: 'primary',
                        text: '确定编辑',
                    },
                    cancelBtnConfig: {
                        text: '取消',
                    },
                },
            },
            {
                handler (resolve, data) {
                    this.$message({
                        message: `${data.name}不要总想着搞个大新闻`,
                        type: 'success',
                        duration: 2000,
                    })
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                },
                triggerConfig: {
                    text: '搞个大新闻',
                    type: 'warning',
                    size: 'small',
                },
            },
            {
                name: 'delete',
                component: () => import('@/components/common/operators/delete').then((rst) => rst.default),
                config: {
                    doDeleteRequest: delUser,
                    triggerConfig: {
                        text: '删除用户',
                        type: 'danger',
                        size: 'small',
                    },
                },
            },
            {
                name: 'toggle',
                component: () => import('@/components/common/operators/toggle').then((rst) => rst.default),
                config: {
                    descriptor: [
                        { value: 0, text: '更改性别为女', type: 'warning', },
                        { value: 1, text: '更改性别为男', type: 'danger', },
                    ],
                    field: 'gender',
                    handleToggle (resolve, data) {
                        console.log(data)
                        resolve()
                    },
                    reserveFields: [
                        'id',
                    ],
                    triggerConfig: {
                        size: 'small',
                    },
                },
            },

        ],
    }
}
