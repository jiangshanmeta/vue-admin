<template>
    <section>
        <slot name="beforeAll" />
        <list-info
            ref="listInfo"
            :field_list="field_list"
            :filters="filters"
            :operators="operators"
            :filter-operators="filterOperators"
            v-bind="listConfig"
        >
            <template #beforeFilters="scope">
                <operators
                    v-if="staticOperators.length>0"
                    :operators="staticOperators"
                    v-bind="scope"
                    :field_list="field_list"
                    style="margin-bottom:8px;"
                    @update="refreshListData"
                />
            </template>

            <template
                #afterFilters="scope"
            >
                <slot
                    name="afterFilters"
                    v-bind="scope"
                />
            </template>
        </list-info>
        <slot name="afterAll" />
    </section>
</template>

<script>
export default {
    components: {
        listInfo: () => import('@/components/common/listInfo'),
        operators: () => import('@/components/common/operators/operators'),
    },
    inheritAttrs: true,
    props: {
        fieldList: {
            type: Object,
            required: true,
        },
        staticOperators: {
            type: Array,
            default: function () {
                return [
                ]
            },
        },
        filters: {
            type: Array,
            default: function () {
                return [
                ]
            },
        },
        listConfig: {
            type: Object,
            default: function () {
                return {}
            },
        },
        operators: {
            type: Array,
            default: function () {
                return [
                ]
            },
        },
        filterOperators: {
            type: Array,
            default: function () {
                return [
                ]
            },
        },
    },
    methods: {
        refreshListData () {
            this.$refs.listInfo && this.$refs.listInfo.getListInfo()
        },
    },
}

</script>
