<template>
    <el-form
        v-if="filters.length || (!hasInjectFilterComponents || componentsInjected)"
        v-show="filters.length"
        :inline="true"
        class="filters"
    >
        <el-form-item
            v-for="item in filters"
            :key="item.field"
            :label="item.label"
        >
            <component
                :is="item.filterComponent.name"
                :ref="item.field"
                v-model="filtersValueMap[item.field]"
                v-bind="generateFilterProp(item)"
            />
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
                    :filters="filters"
                    style="display: inline-block;"
                    @update="search"
                />
            </section>
        </el-form-item>
    </el-form>
</template>

<script>
import injectComponents from '@/components/common/injectHelper/injectComponents';
import getNeedInjectFilterComponentsList from '@/components/common/injectHelper/injectFilterComponentsHelper';

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
        EditorTimeYear: () => import('../Editors/EditorTimeYear'),
        EditorTimeMonth: () => import('../Editors/EditorTimeMonth'),
        EditorTimeDay: () => import('../Editors/EditorTimeDay'),
        EditorTimeTs: () => import('../Editors/EditorTimeTs'),
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
    },
    props: {
        filters: {
            type: Array,
            required: true,
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
        };
    },
    computed: {
        formData () {
            return JSON.parse(JSON.stringify(this.filtersValueMap));
        },
    },
    created () {
        this.needInjectFilterComponentsList = getNeedInjectFilterComponentsList(this.filters);
        this.injectFilterComponents();

        this.resetValue();
        this.initRelates();
        this.initWatch();
    },
    methods: {
        search () {
            this.$emit('search');
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
            this.filtersValueMap = this.filters.reduce((obj, item) => {
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
            const relateProps = relates.filter(item => item.propField).reduce((obj, item) => {
                obj[item.propField] = this.getRelateData(item);
                return obj;
            }, Object.create(null));

            return Object.assign({}, this.$attrs, config, relateProps);
        },
        initRelates () {
            // 支持 filterComponent relates handler 模式
            this.filters.forEach((filterItem) => {
                if (!Array.isArray(filterItem.relates)) {
                    return;
                }
                filterItem.relates.filter((relateItem) => typeof relateItem.handler === 'function').forEach((relateItem) => {
                    const callback = function (newVal, oldVal) {
                        if (this.$refs[filterItem.field] && this.$refs[filterItem.field][0]) {
                            relateItem.handler.call(this.$refs[filterItem.field][0], newVal, oldVal);
                        } else {
                            setTimeout(() => {
                                callback.call(this, newVal, oldVal);
                            }, 0);
                        }
                    };

                    this.$watch(() => {
                        return this.getRelateData(relateItem);
                    }, callback, {
                        ...relateItem.config,
                    });
                });
            });
        },
        initWatch () {
            const watchFilters = this.filters.filter(item => item.watch);
            if (watchFilters.length) {
                this.$watch(() => {
                    return watchFilters.map(item => this.filtersValueMap[item.field]);
                }, () => {
                    const isWatchFilterValueValid = watchFilters.every((item) => {
                        if (!item.isValidValue) {
                            return true;
                        }
                        return item.isValidValue(this.filtersValueMap[item.field], item.field);
                    });

                    if (isWatchFilterValueValid) {
                        this.search();
                    }
                });
            }
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
</style>
