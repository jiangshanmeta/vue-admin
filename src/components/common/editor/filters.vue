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
                :is="item.editorComponent.name"
                :ref="item.field"
                v-model="filtersValueMap[item.field]"
                v-bind="generateFilterProp(item)"
            />
        </el-form-item>
        <el-form-item>
            <section>
                <el-button
                    type="primary"
                    style="margin-right:10px;"
                    @click="search"
                >
                    查询
                </el-button>

                <operators
                    :field_list="field_list"
                    :operators="filterOperators"
                    :data="filtersValueMap"
                    :filters="filters"
                    style="display:inline-block;"
                    @update="search"
                />
            </section>
        </el-form-item>
    </el-form>
</template>

<script>
import injectComponents from '@/widget/injectComponents'
import getNeedInjectFilterComponentsList from '@/injectHelper/injectFilterComponentsHelper'

export default {
    name: 'Filters',
    components: {
        filter_enum_select: () => import('./filter_enum_select'),
        filter_enum_select_async: () => import('./filter_enum_select_async'),
        filter_enum_select_relates: () => import('./filter_enum_select_relates'),
        filter_enum_autocomplete: () => import('./filter_enum_autocomplete'),
        filter_enum_autocomplete_async: () => import('./filter_enum_autocomplete_async'),
        filter_enum_autocomplete_relates: () => import('./filter_enum_autocomplete_relates'),

        editor_enum_select: () => import('./editor_enum_select'),
        editor_enum_select_async: () => import('./editor_enum_select_async'),
        editor_enum_select_relates: () => import('./editor_enum_select_relates'),
        editor_enum_autocomplete: () => import('./editor_enum_autocomplete'),
        editor_enum_autocomplete_async: () => import('./editor_enum_autocomplete_async'),
        editor_enum_autocomplete_relates: () => import('./editor_enum_autocomplete_relates'),
        editor_time_year: () => import('./editor_time_year'),
        editor_time_month: () => import('./editor_time_month'),
        editor_time_day: () => import('./editor_time_day'),
        editor_string: () => import('./editor_string'),
        editor_number: () => import('./editor_number'),

        operators: () => import('@/components/common/operators/operators'),
    },
    inheritAttrs: true,
    state: {
        needInjectFilterComponentsList: [
        ],
        get hasInjectFilterComponents () {
            return this.needInjectFilterComponentsList.length > 0
        },
    },
    props: {
        filters: {
            type: Array,
            required: true,
        },
        fieldList: {
            type: Object,
            required: true,
        },
        filterOperators: {
            type: Array,
            default () {
                return [
                ]
            },
        },
    },
    data () {
        return {
            componentsInjected: false,
            filtersValueMap: {},
        }
    },
    computed: {
        formData () {
            return JSON.parse(JSON.stringify(this.filtersValueMap))
        },
    },
    created () {
        this.needInjectFilterComponentsList = getNeedInjectFilterComponentsList(this.filters)
        this.injectFilterComponents()

        this.resetValue()
        this.initRelates()
        this.initWatch()
    },
    methods: {
        search () {
            this.$emit('search')
        },
        injectFilterComponents () {
            if (!this.hasInjectFilterComponents) {
                return
            }
            injectComponents(this, this.needInjectFilterComponentsList).then(() => {
                this.componentsInjected = true
            })
        },
        resetValue () {
            this.filtersValueMap = this.filters.reduce((obj, item) => {
                const defaultConfig = item.editorComponent.default
                obj[item.field] = typeof defaultConfig === 'function' ? defaultConfig.call(this) : defaultConfig
                return obj
            }, {})
        },
        getRelateData (relateItem) {
            if (Array.isArray(relateItem.relateField)) {
                return relateItem.relateField.reduce((obj, field) => {
                    obj[field] = this.filtersValueMap[field]
                    return obj
                }, {})
            } else {
                return this.filtersValueMap[relateItem.relateField]
            }
        },
        // 支持 editorComponent relates propField 模式
        generateFilterProp (filterItem) {
            const config = filterItem.editorComponent.config || {}
            const {
                relates = [
                ],
            } = config

            const relateProps = relates.filter(item => item.propField).reduce((obj, item) => {
                obj[item.propField] = this.getRelateData(item)
                return obj
            }, Object.create(null))

            return Object.assign({}, this.$attrs, config, relateProps)
        },
        initRelates () {
            // 支持 editorComponent relates handler 模式
            this.filters.forEach((filterItem) => {
                if (!filterItem.editorComponent || !filterItem.editorComponent.config || !Array.isArray(filterItem.editorComponent.config.relates)) {
                    return
                }

                const relates = filterItem.editorComponent.config.relates
                relates.filter((relateItem) => typeof relateItem.handler === 'function').forEach((relateItem) => {
                    const callback = function (newVal, oldVal) {
                        if (this.$refs[filterItem.field] && this.$refs[filterItem.field][0]) {
                            relateItem.handler.call(this.$refs[filterItem.field][0], newVal, oldVal)
                        } else {
                            setTimeout(() => {
                                callback.call(this, newVal, oldVal)
                            }, 0)
                        }
                    }

                    this.$watch(() => {
                        return this.getRelateData(relateItem)
                    }, callback, relateItem.config)
                })
            })
        },
        initWatch () {
            const watchFilters = this.filters.filter(item => item.watch)
            if (watchFilters.length) {
                this.$watch(() => {
                    return watchFilters.map(item => this.filtersValueMap[item.field])
                }, this.search)
            }
        },
    },
    provide () {
        return {
            filtersComponent: this,
        }
    },
}
</script>

<style scoped>
.filters >>> .el-form-item{
    margin-bottom:5px;
}
</style>
