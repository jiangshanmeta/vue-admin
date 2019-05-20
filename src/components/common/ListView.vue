<template>
    <section>
        <slot name="beforeAll" />
        <ListInfo
            ref="listInfo"
            :fields="fields"
            :filters="filters"
            :operators="operators"
            :filter-operators="filterOperators"
            v-bind="listConfig"
        >
            <template #beforeFilters="scope">
                <Operators
                    v-if="staticOperators.length>0"
                    :operators="staticOperators"
                    v-bind="scope"
                    :fields="fields"
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
        </ListInfo>
        <slot name="afterAll" />
    </section>
</template>

<script>
export default {
    name:'ListView',
    components: {
        ListInfo: () => import('@/components/common/ListInfo'),
        Operators: () => import('@/components/common/Operators/Operators'),
    },
    inheritAttrs: true,
    props: {
        fields: {
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
