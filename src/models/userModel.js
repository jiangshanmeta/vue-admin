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
} from '@/server/user';

import {
    onceAsync,
} from '@/widget/utility';

const cacheGetTypEnum = onceAsync(getTypEnum);

export default function () {
    return {
        fields: {
            name: {
                labelName: '用户名',
                editor: {
                    name: 'field_string2',
                    component: () => import('@/components/common/Editors/EditorString'),
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
                        return config.prefix + data;
                    },
                    config: {
                        prefix: '用户名',
                    },
                },
                validator (record, mode) {
                    return [
                        {
                            validator: function (rule, value, cb) {
                                if (mode === 'edit' && record.gender === 0 && value === '渡边早季') {
                                    cb('早季是女孩子的名字');
                                }

                                if (value.length < 2) {
                                    cb([
                                        new Error('姓名最少两个字符'),
                                    ]);
                                } else {
                                    cb();
                                }
                            },
                        },
                    ];
                },
            },
            password: {
                labelName: '密码',
                editor: {
                    name: 'EditorPwd',
                    relates: [
                        {
                            relateField: [
                                'name',
                            ],
                            handler (info) {
                                console.log(info);
                                if (info.name === 'lelouch') {
                                    this.$emit('input', 'naive');
                                }
                            },
                            config: {
                                immediate: true,
                            },
                        },
                    ],
                    config (val, localRecord, record) {
                        if (record.name === 'lelouch' || localRecord.name === '渡边早季') {
                            return {
                                disabled: true,
                            };
                        }
                        return {
                            placeholder: '请输入密码',
                        };
                    },
                    default: '',
                },
                view: {
                    component: () => import('@/components/common/Views/ViewLink'),
                    config: {
                        getLink (data) {
                            return `https://www.google.com/search?q=${data}`;
                        },
                        getText (data) {
                            return '*'.repeat(data.length);
                        },
                        tag: 'span',
                    },
                },
                validator: [
                    {
                        validator (rule, value, cb) {
                            if (value.length > 15) {
                                cb(
                                    new Error('密码位数最多为15位')
                                );
                            } else {
                                cb();
                            }
                        },
                    },
                    {
                        validator (rule, value, cb) {
                            if (value.includes('???')) {
                                cb(new Error('???'));
                            } else {
                                cb();
                            }
                        },
                    },

                ],
                autoValidate (mode) {
                    if (mode === 'create') {
                        return true;
                    }
                    return false;
                },
            },
            gender: {
                labelName: '性别',
                editor: {
                    name: 'EditorGender',
                    default: 0,
                },
                view: {
                    component: () => import('@/components/common/Views/ViewEnum'),
                    config: {
                        enums: genderEnum,
                    },
                },
                tip (mode) {
                    return `暂不支持LGBT ${mode}`;
                },
                tableColumnConfig: {
                    align: 'center',
                },
                label: {
                    default: {
                        component: () => import('@/components/user/Labels/LabelUserRedstar'),
                        exclude: [
                            'create',
                        ],
                    },
                    info: {
                        handler (labelName, config) {
                            return `${config.prefix}${labelName}`;
                        },
                        config: {
                            prefix: '++',
                        },
                    },

                },

            },
            typ: {
                labelName: '类型',
                editor: {
                    name: 'EditorEnumAsyncSelect',
                    config: {
                        getCandidate: cacheGetTypEnum,
                        valuefield: 'value',
                        labelfield: 'label',
                        getModelValue (data) {
                            return data.index;
                        },
                        setModelValue (data) {
                            return {
                                index: data,
                            };
                        },
                    },
                    default () {
                        return {
                            index: 0,
                        };
                    },
                },
                view: {
                    component: () => import('@/components/common/Views/ViewEnum'),
                    config: {
                        enums () {
                            return this.$store.state.test.typHash;
                        },
                    },
                    getViewValue (data) {
                        return data.index;
                    },
                },
            },
            privilege: {
                labelName: '权限',
                editor: {
                    name: 'EditorArrayRelatesCheckbox',
                    relates: [
                        {
                            relateField: [
                                'typ',
                            ],
                            propField: 'relateData',
                        },
                    ],
                    config: {
                        getCandidate: getPrivilege,
                        labelfield: 'name',
                        valuefield: 'id',
                        isValidValue (data) {
                            return data.typ.index !== 0;
                        },
                        getCacheKey (value, field) {
                            if (field === 'typ') {
                                return value.index;
                            }
                            return value;
                        },
                    },
                    default () {
                        return [];
                    },
                },
                colspan: {
                    create: 3,
                    edit: 3,
                },
            },
            desc: {
                labelName: '备注',
                editor: {
                    name: 'EditorTextrich',
                    default: '这是富文本编辑器蛤',
                },
                view: {
                    component: () => import('@/components/common/Views/ViewHTML'),
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
        collectionOperators: [
            {
                name: 'CollectionOperatorCreate',
                component: () => import('@/components/common/CollectionOperators/CollectionOperatorCreate'),
                config: {
                    getCreateFields(){
                        return new Promise((resolve)=>{
                            getCreateFields(resolve);
                        })
                    },
                    doCreateRequest(data){
                        return new Promise((resolve)=>{
                            createUser(resolve,data);
                        });
                    },
                    fieldLayout (record) {
                        if (record.gender === 0) {
                            return [
                                [
                                    'name', 'password',
                                ],
                                [
                                    'gender', 'typ',
                                ],
                                [
                                    'privilege',
                                ],
                            ];
                        } else {
                            return [
                                [
                                    'name', 'password',
                                ],
                                [
                                    'gender', 'typ',
                                ],
                                [
                                    'privilege',
                                ],
                                [
                                    'desc',
                                ],
                            ];
                        }
                    },
                    effectLayoutFields: [
                        'gender',
                    ],
                    triggerConfig: {
                        text: '新建用户',
                        type: 'primary',
                    },
                    dialogConfig: {
                        title: '新建用户',
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

        ],
        filters () {
            return [
                {
                    label: '姓名',
                    field: 'username',
                    filterComponent: {
                        name: 'EditorString',
                        config: {
                            placeholder: '请输入用户姓名',
                        },
                        default: '',
                    },
                    validator: [
                        {
                            validator (rule, value, cb) {
                                console.log('here');
                                if (value === '小管家') {
                                    cb(new Error('不能搜索小管家'));
                                } else {
                                    cb();
                                }
                            },
                        },
                    ],
                    autoValidate: false,
                },
                {
                    label: '类型',
                    field: 'typ',
                    filterComponent: {
                        name: 'FilterEnumAsyncSelect',
                        config (val, record) {
                            const result = {
                                getCandidate: cacheGetTypEnum,
                                allvalue: -1,
                                alllabel: '全部',
                                getModelValue (data) {
                                    return data.index;
                                },
                                setModelValue (data) {
                                    return {
                                        index: data,
                                    };
                                },
                            };
                            if (record.username === 'lelouch') {
                                result.disabled = true;
                            }

                            return result;
                        },

                        default () {
                            return {
                                index: -1,
                            };
                        },
                    },
                },
                {
                    label: '权限',
                    field: 'privilege',
                    filterComponent: {
                        name: 'FilterEnumRelatesSelect',
                        config: {
                            getCandidate: getPrivilege,
                            getCacheKey (value, field) {
                                if (field === 'typ') {
                                    return value.index;
                                }
                                return value;
                            },
                            valuefield: 'id',
                            labelfield: 'name',
                            allvalue: 'all',
                            alllabel: '不限',
                            handleInvalidValue () {
                                this.$emit('input', 'all');
                            },
                        },
                        default: 'all',
                    },
                    relates: [
                        {
                            relateField: [
                                'typ',
                            ],
                            propField: 'relateData',
                        },
                    ],
                },
                {
                    label: '自定义filter',
                    field: 'test',
                    filterComponent: {
                        name: 'test_custom_filter',
                        config: {
                            msg: '测试自定义filter',
                        },
                        component: () => import('@/components/user/Filters/FilterUserTestCustomFilter'),
                        default: 'test',
                    },
                    watch: true,
                },
            ];
        },
        filterOperators: [
            {
                name: 'FilterOperatorReset',
                component: () => import('@/components/common/FilterOperators/FilterOperatorReset'),
            },
        ],
        listConfig: {
            createdHook () {
                setTimeout(() => {
                    this.$store.commit('test/setTypHash', JSON.parse(JSON.stringify(typHash)));
                }, 5000);
            },
            listRequest(params){
                return new Promise((resolve)=>{
                    getUserList(resolve,params)
                });
            },
            sortableFields: {
                typ: true,
            },
            initialSortField: 'name',
            initialSortOrder: 'desc',
            paginationConfig: {
                layout: 'total, sizes, prev, pager, next, jumper',
                pageSizes: [
                    2, 10, 20, 30, 50,
                ],
            },

        },
        documentOperators: [
            {
                name: 'DocumentOperatorInfo',
                component: () => import('@/components/common/DocumentOperators/DocumentOperatorInfo'),
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
                name: 'DocumentOperatorEdit',
                component: () => import('@/components/common/DocumentOperators/DocumentOperatorEdit'),
                config: {
                    getEditInfo: getEditUserInfo,
                    doEditRequest: editUser,
                    fieldLayout: [
                        [
                            'name', 'password',
                        ],
                        [
                            'gender', 'typ',
                        ],
                        [
                            'privilege',
                        ],
                        [
                            'desc',
                        ],
                    ],
                    autoValidate: false,
                    triggerConfig: {
                        text: '编辑',
                        size: 'small',
                        type: 'primary',
                    },
                    dialogConfig: {
                        title: '编辑用户',
                    },
                    confirmBtnConfig: {
                        type: 'primary',
                        text: '确定编辑',
                    },
                    cancelBtnConfig: {
                        text: '取消',
                    },
                    recordWatch (data) {
                        const unwatch = this.$watch(() => {
                            return {
                                name: data.name,
                                password: data.password,
                            };
                        }, (info) => {
                            if (info.name === '渡边早季' && info.password === '123456') {
                                setTimeout(() => {
                                    data.desc = 'test recordWatch';
                                }, 1000);
                            }
                        });
                        return [
                            unwatch,
                        ];
                    },

                },
            },
            {
                handler (data) {
                    this.$message({
                        message: `${data.name}不要总想着搞个大新闻`,
                        type: 'success',
                        duration: 2000,
                    });
                    setTimeout(() => {
                        this.$emit('update');
                    }, 1000);
                },
                triggerConfig: {
                    text: '搞个大新闻',
                    type: 'warning',
                    size: 'small',
                },
            },
            {
                name: 'DocumentOperatorDelete',
                component: () => import('@/components/common/DocumentOperators/DocumentOperatorDelete'),
                config: {
                    doDeleteRequest(data){
                        return new Promise((resolve)=>{
                            delUser(resolve,data)
                        })
                    },
                    triggerConfig: {
                        text: '删除用户',
                        type: 'danger',
                        size: 'small',
                    },
                },
            },
        ],
    };
}
