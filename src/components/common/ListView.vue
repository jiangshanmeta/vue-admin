<template>
    <main>
        <slot name="beforeAll" />
        <ListInfo
            ref="listInfo"
            :fields="fields"
            :filters="filters"
            :document-operators="documentOperators"
            :filter-operators="filterOperators"
            v-bind="listConfig"
        >
            <template #beforeFilters="scope">
                <Operators
                    :operators="collectionOperators"
                    v-bind="scope"
                    :fields="fields"
                    style="margin-bottom: 8px;"
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
    </main>
</template>

<script>
export default {
    name: 'ListView',
    components: {
        ListInfo: () => import('@/components/common/ListInfo'),
        Operators: () => import('@/components/common/Operators'),
    },
    inheritAttrs: true,
    props: {
        fields: {
            type: Object,
            required: true,
        },
        collectionOperators: {
            type: [
                Array, Function,
            ],
            default: function () {
                return [];
            },
        },
        filters: {
            type: [
                Array, Function,
            ],
            default: function () {
                return [];
            },
        },
        listConfig: {
            type: Object,
            default: function () {
                return {};
            },
        },
        documentOperators: {
            type: [
                Array, Function,
            ],
            default: function () {
                return [];
            },
        },
        filterOperators: {
            type: [
                Array, Function,
            ],
            default: function () {
                return [];
            },
        },
    },
    methods: {
        refreshListData () {
            this.$refs.listInfo && this.$refs.listInfo.getListInfo();
        },
    },
};

</script>
