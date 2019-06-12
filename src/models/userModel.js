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

import Vue from 'vue';

const userModelCacheData = Vue.observable({
    asyncTypHash:{},
});

const cacheGetTypEnum = onceAsync(getTypEnum);

export default function () {
    return {
        fields: {
            name: {
                labelName: '用户名',
                editor: {
                    name: 'field_string2',
                    component: () => import('@/components/common/Editors/EditorString').then((rst) => rst.default),
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
                validator: [
                    {
                        validator: function (rule, value, cb) {
                            if (value.length < 2) {
                                cb([
                                    new Error('姓名最少两个字符'),
                                ]);
                            } else {
                                cb();
                            }
                        },
                    },
                ],
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
                    config: {
                        placeholder: '请输入密码',
                    },
                    default: '',
                },
                validator: [
                    {
                        validator (rule, value, cb) {
                            if (value.length > 15) {
                                cb([
                                    new Error('密码位数最多为15位'),
                                ]);
                            } else {
                                cb();
                            }
                        },
                    },

                ],
            },
            gender: {
                labelName: '性别',
                editor: {
                    name: 'EditorGender',
                    default: 0,
                },
                view: {
                    component: () => import('@/components/common/Views/ViewEnum').then((rst) => rst.default),
                    config: {
                        enums: genderEnum,
                    },
                },
                tip () {
                    return '暂不支持LGBT';
                },
                tableColumnConfig: {
                    align: 'center',
                },
                label: {
                    default: {
                        component: () => import('@/components/user/Labels/LabelUserRedstar').then((rst) => rst.default),
                        exclude: [
                            'create',
                        ],
                    },
                    info: {
                        handler(labelName,config){
                            return `${config.prefix}${labelName}`;
                        },
                        config:{
                            prefix:"++",
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
                    component: () => import('@/components/common/Views/ViewEnum').then((rst) => rst.default),
                    config: {
                        get enums(){
                            return userModelCacheData.asyncTypHash;
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
                        isValidValue (value, field) {
                            if (field === 'typ') {
                                value = value.index;
                                return value !== 0;
                            }
                            return true;
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
                    component: () => import('@/components/common/Views/ViewHTML').then((rst) => rst.default),
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
                name: 'StaticOperatorCreate',
                component: () => import('@/components/common/StaticOperators/StaticOperatorCreate').then((rst) => rst.default),
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
                filterComponent: {
                    name: 'EditorString',
                    config: {
                        placeholder: '请输入用户姓名',
                    },
                    default: '',
                },
            },
            {
                label: '类型',
                field: 'typ',
                filterComponent: {
                    name: 'FilterEnumAsyncSelect',
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
                filterComponent: {
                    name: 'FilterEnumRelatesSelect',
                    config: {
                        getCandidate: getPrivilege,
                        valuefield: 'id',
                        labelfield: 'name',
                        placeholder: '请选择权限',
                        allvalue: 'all',
                        alllabel: '不限',
                        handleInvalidRelateIds () {
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
                    component: () => import('@/components/user/Filters/FilterUserTestCustomFilter').then((rst) => rst.default),
                    default: 'test',
                },
                watch: true,
            },
        ],
        filterOperators: [
            {
                name: 'FilterOperatorsReset',
                component: () => import('@/components/common/FilterOperators/FilterOperatorsReset').then((rst) => rst.default),
            },
        ],
        listConfig: {
            createdHook(){
                setTimeout(()=>{
                    userModelCacheData.asyncTypHash = JSON.parse(JSON.stringify(typHash));
                },5000);
            },
            listRequest: getUserList,
            sortableFields:{
                'typ':true,
            },
            initialSortField:"name",
            initialSortOrder:"desc",
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
                component: () => import('@/components/common/Operators/OperatorInfo').then((rst) => rst.default),
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
                component: () => import('@/components/common/Operators/OperatorEdit').then((rst) => rst.default),
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
                    });
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                },
                triggerConfig: {
                    text: '搞个大新闻',
                    type: 'warning',
                    size: 'small',
                },
            },
            {
                name: 'delete',
                component: () => import('@/components/common/Operators/OperatorDelete').then((rst) => rst.default),
                config: {
                    doDeleteRequest: delUser,
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
