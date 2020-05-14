<template>
    <el-form
        v-if="finalFilters.length || (!hasInjectFilterComponents || componentsInjected)"
        :inline="true"
        class="filters"
    >
        <el-form-item
            v-for="item in finalFilters"
            :key="item.field"
            :label="item.label"
        >
            <component
                :is="item.filterComponent.name"
                :ref="item.field"
                v-model="filtersValueMap[item.field]"
                v-bind="generateFilterProp(item)"
            />
            <p
                v-if="validators[item.field] && validators[item.field]['hasErr']"
                class="text-danger form-helper"
            >
                {{ validators[item.field]['errMsg'] }}
            </p>
        </el-form-item>
        <el-form-item>
            <section>
                <el-button
                    type="primary"
                    style="margin-right: 10px;"
                    @click="search"
                >
                    查询
                </el-button>

                <Operators
                    :fields="fields"
                    :operators="filterOperators"
                    :data="filtersValueMap"
                    :filters="finalFilters"
                    style="display: inline-block;"
                    @update="search"
                />
            </section>
        </el-form-item>
    </el-form>
</template>

<script>
import AsyncValidator from 'async-validator';

import injectComponents from '@/components/common/injectHelper/injectComponents';
import getNeedInjectFilterComponentsList from '@/components/common/injectHelper/injectFilterComponentsHelper';

const validatorOption = {
    first: true,
};

export default {
    name: 'Filters',
    components: {
        FilterEnumSelect: () => import('./FilterEnumSelect'),
        FilterEnumAsyncSelect: () => import('./FilterEnumAsyncSelect'),
        FilterEnumRelatesSelect: () => import('./FilterEnumRelatesSelect'),
        FilterEnumAutocomplete: () => import('./FilterEnumAutocomplete'),
        FilterEnumAsyncAutocomplete: () => import('./FilterEnumAsyncAutocomplete'),
        FilterEnumRelatesAutocomplete: () => import('./FilterEnumRelatesAutocomplete'),

        EditorEnumSelect: () => import('../Editors/EditorEnumSelect'),
        EditorEnumAsyncSelect: () => import('../Editors/EditorEnumAsyncSelect'),
        EditorEnumRelatesSelect: () => import('../Editors/EditorEnumRelatesSelect'),
        EditorEnumAutocomplete: () => import('../Editors/EditorEnumAutocomplete'),
        EditorEnumAsyncAutocomplete: () => import('../Editors/EditorEnumAsyncAutocomplete'),
        EditorEnumRelatesAutocomplete: () => import('../Editors/EditorEnumRelatesAutocomplete'),
        EditorString: () => import('../Editors/EditorString'),
        EditorNumber: () => import('../Editors/EditorNumber'),

        Operators: () => import('@/components/common/Operators'),
    },
    inheritAttrs: true,
    state: {
        needInjectFilterComponentsList: [],
        get hasInjectFilterComponents () {
            return this.needInjectFilterComponentsList.length > 0;
        },
        hasValidateListener: false,
    },
    props: {
        filters: {
            type: [
                Array, Function,
            ],
            default () {
                return [];
            },
        },
        fields: {
            type: Object,
            required: true,
        },
        filterOperators: {
            type: [
                Array, Function,
            ],
            default () {
                return [];
            },
        },
    },
    data () {
        return {
            componentsInjected: false,
            filtersValueMap: {},
            validators: {},
            relatesDataByField: {},
        };
    },
    computed: {
        finalFilters () {
            if (Array.isArray(this.filters)) {
                return this.filters;
            } else {
                return this.filters();
            }
        },
        formData () {
            return JSON.parse(JSON.stringify(this.filtersValueMap));
        },
    },
    created () {
        this.needInjectFilterComponentsList = getNeedInjectFilterComponentsList(this.finalFilters);
        this.injectFilterComponents();

        this.resetValue();
        this.initRelates();
        this.initWatch();
        this.initValidate();
    },
    methods: {
        search () {
            const keys = Object.keys(this.validators);

            const promises = keys.map((field) => {
                return this.validateField(field, this.filtersValueMap[field]);
            });

            if (!this.hasValidateListener) {
                keys.forEach((field) => {
                    if (!this.validators[field].unwatch) {
                        this.validators[field].unwatch = this.addValidateInputListener(field);
                    }
                });
                this.hasValidateListener = true;
            }
            Promise.all(promises).then(() => {
                this.$emit('search');
            }).catch(() => {});
        },
        injectFilterComponents () {
            if (!this.hasInjectFilterComponents) {
                return;
            }
            injectComponents(this.needInjectFilterComponentsList, this).then(() => {
                this.componentsInjected = true;
            });
        },
        resetValue () {
            this.filtersValueMap = this.finalFilters.reduce((obj, item) => {
                const defaultConfig = item.filterComponent.default;
                obj[item.field] = typeof defaultConfig === 'function' ? defaultConfig.call(this) : defaultConfig;
                return obj;
            }, {});
        },
        getRelateData (relateItem) {
            if (Array.isArray(relateItem.relateField)) {
                return relateItem.relateField.reduce((obj, field) => {
                    obj[field] = this.filtersValueMap[field];
                    return obj;
                }, {});
            } else {
                return this.filtersValueMap[relateItem.relateField];
            }
        },
        // 支持 filterComponent relates propField 模式
        generateFilterProp (filterItem) {
            const relates = filterItem.relates || [];
            const config = filterItem.filterComponent.config || {};
            const relateProps = relates.reduce((obj, item, index) => {
                if (item.propField) {
                    obj[item.propField] = this.relatesDataByField[filterItem.field][index];
                }
                return obj;
            }, Object.create(null));

            return Object.assign({}, this.$attrs, config, relateProps);
        },
        initRelates () {
            // 支持 filterComponent relates handler 模式
            this.finalFilters.forEach(({
                relates,
                field,
            }, index) => {
                if (!Array.isArray(relates) || relates.length === 0) {
                    return;
                }
                this.$set(this.relatesDataByField, field, []);
                relates.forEach((relateItem, index) => {
                    this.$watch(() => {
                        return this.getRelateData(relateItem);
                    }, (newValue) => {
                        this.relatesDataByField[field].splice(index, 1, newValue);
                    }, {
                        immediate: true,
                    });
                    if (typeof relateItem.handler !== 'function') {
                        return;
                    }
                    const callback = function (newVal, oldVal) {
                        if (this.$refs[field] && this.$refs[field][0]) {
                            relateItem.handler.call(this.$refs[field][0], newVal, oldVal);
                        } else {
                            setTimeout(() => {
                                callback.call(this, newVal, oldVal);
                            }, 0);
                        }
                    };
                    this.$watch(() => {
                        return this.relatesDataByField[field][index];
                    }, callback, {
                        ...relateItem.config,
                    });
                });
            });
        },
        initWatch () {
            const watchFilters = this.finalFilters.filter(item => item.watch);
            if (watchFilters.length) {
                this.$watch(() => {
                    return watchFilters.map(item => this.filtersValueMap[item.field]);
                }, this.search);
            }
        },
        initValidate () {
            this.finalFilters.forEach(({
                field,
                validator,
                autoValidate = true,
            }) => {
                if (!validator) {
                    return;
                }
                const asyncValidator = new AsyncValidator({
                    [field]: typeof validator === 'function' ? validator.call(this, this.filtersValueMap) : validator,
                });
                this.$set(this.validators, field, {
                    hasErr: false,
                    errMsg: '',
                    validator: asyncValidator,
                    unwatch: null,
                });
                if (autoValidate) {
                    this.validators[field].unwatch = this.addValidateInputListener(field);
                }
            });
        },
        addValidateInputListener (field) {
            return this.$watch(() => {
                return this.filtersValueMap[field];
            }, (value) => {
                this.validateField(field, value).catch(() => {});
            });
        },
        validateField (field, value) {
            return new Promise((resolve, reject) => {
                const asyncValidator = this.validators[field].validator;
                asyncValidator.validate({
                    [field]: value,
                },
                validatorOption,
                (errors, fields) => {
                    if (errors) {
                        this.validators[field].hasErr = true;
                        this.validators[field].errMsg = errors[0].message;
                        reject(errors[0].message);
                    } else {
                        this.validators[field].hasErr = false;
                        this.validators[field].errMsg = '';
                        resolve();
                    }
                });
            });
        },

    },
    provide () {
        return {
            filtersComponent: this,
        };
    },
};
</script>

<style scoped>
.filters >>> .el-form-item {
    margin-bottom: 5px;
}

.form-helper {
    margin-top: 5px;
    margin-bottom: 5px;
    color: #737373;
    font-size: 12px;
    line-height: 1.42;
}

.text-danger {
    color: #ff4949;
}
</style>
