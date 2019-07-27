<template>
    <section
        v-if="Object.keys(fields).length>0 && (!hasInjectComponent || componentsInjected)"
    >
        <slot
            name="beforeFilters"
            :data="data"
            :formData="formData"
            :selectedData="multipleSelection"
        />

        <Filters
            ref="filters"
            :filters="filters"
            :fields="fields"
            :filter-operators="filterOperators"
            @search="getListInfo"
        />

        <slot
            name="afterFilters"
            :data="data"
            :formData="formData"
            :selectedData="multipleSelection"
        />

        <el-table
            v-if="fieldList.length>0 && data.length>0"
            :data="data"
            style="width:100%;"
            v-bind="tableConfig"
            @sort-change="handleSortChange"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
                v-if="selection"
                type="selection"
            />
            <el-table-column
                v-for="field in fieldList"
                :key="field"
                :label="fields[field].labelName"
                :prop="field"
                :sortable="sortableFields[field]?'custom':false"
                v-bind="fields[field].tableColumnConfig || {}"
            >
                <template #default="{row}">
                    <Views
                        :view="fields[field].view"
                        :record="row"
                        :field="field"
                        :component="injectedViewComponents[field]"
                    />
                </template>
            </el-table-column>
            <el-table-column
                :label="operatorsLabel"
                :min-width="operatorMinWidth"
            >
                <template #default="{row}">
                    <Operators
                        :fields="fields"
                        :operators="recordOperators"
                        :data="row"
                        @update="getListInfo"
                        @setWidth="setOperatorWidth"
                    />
                </template>
            </el-table-column>
        </el-table>
        <section
            v-if="data.length === 0"
            style="margin:10px;text-align:center;font-size:28px;color:#777;letter-spacing:8px;"
        >
            {{ emptyText }}
        </section>
        <el-pagination
            v-if="paginated && data.length>0"
            v-bind="paginationConfig"
            :current-page.sync="pageIndex"
            :page-size="pageSize"
            :total="total"
            class="center-table"
            @size-change="handleSizeChange"
        />
    </section>
</template>

<script>
import Filters from '@/components/common/Filters/Filters';
import Operators from '@/components/common/Operators';
import Views from '@/components/common/Views/Views';

import {
    logError,
    deepFreeze,
} from '@/widget/utility';

import injectComponents from '@/components/common/injectHelper/injectComponents';
import getNeedInjectViewComponentsMap from '@/components/common/injectHelper/injectViewComponentsHelper';

export default {
    name: 'ListInfo',
    components: {
        Filters,
        Operators,
        Views,
    },
    state: {
        needInjectViewComponentsMap: {},
        get hasInjectComponent () {
            return Object.keys(this.needInjectViewComponentsMap).length > 0;
        },
    },
    props: {
        fields: {
            type: Object,
            required: true,
        },

        filters: {
            type: Array,
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
        createdHook: {
            type: Function,
            default: () => {},
        },
        initialPageSize: {
            type: Number,
            default: 20,
        },
        pageIndexReqName: {
            type: String,
            default: 'pageIndex',
        },
        pageSizeReqName: {
            type: String,
            default: 'pageSize',
        },
        initialSortField: {
            type: String,
            default: '',
        },
        initialSortOrder: {
            type: String,
            default: '',
        },
        sortFieldReqName: {
            type: String,
            default: 'sortField',
        },
        sortOrderReqName: {
            type: String,
            default: 'sortOrder',
        },
        transformRequestData: {
            type: Function,
            default: function (data) {
                return data;
            },
        },
        listRequest: {
            type: Function,
            required: true,
        },
        transformListData: {
            type: Function,
            default: async (data) => {
                return data;
            },
        },

        tableConfig: {
            type: Object,
            default () {
                return {};
            },
        },
        selection: {
            type: Boolean,
            default: false,
        },
        sortableFields: {
            type: Object,
            default: function () {
                return {};
            },
        },

        recordOperators: {
            type: [
                Array, Function,
            ],
            default: function () {
                return [];
            },
        },
        operatorsLabel: {
            type: String,
            default: '操作',
        },

        emptyText: {
            type: String,
            default: '暂无数据',
        },

        paginated: {
            type: Boolean,
            default: true,
        },
        paginationConfig: {
            type: Object,
            default () {
                return {};
            },
        },
    },
    data () {
        return {
            componentsInjected: false,
            data: [],
            pageIndex: 1,
            sortField: this.initialSortField,
            sortOrder: this.initialSortOrder,
            total: 0,
            fieldList: [],
            multipleSelection: [],
            operatorMinWidth: 0,
            pageSize: this.initialPageSize,
        };
    },
    beforeCreate () {
        Object.defineProperty(this, 'formData', {
            get () {
                return this.$refs.filters && this.$refs.filters.formData;
            },
        });
    },
    created () {
        this.createdHook();

        this.needInjectViewComponentsMap = getNeedInjectViewComponentsMap(this.fields, Object.keys(this.fields));
        this.injectViewComponents();

        this.$watch(() => {
            return {
                pageSize: this.pageSize,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                pageIndex: this.pageIndex,
            };
        }, this.getListInfo, {
            immediate: true,
        });
    },
    methods: {
        injectViewComponents () {
            this.injectedViewComponents = {};
            if (!this.hasInjectComponent) {
                return;
            }

            injectComponents(this.needInjectViewComponentsMap, this.injectedViewComponents).then(() => {
                this.componentsInjected = true;
            });
        },
        handleSortChange (sortInfo) {
            if (sortInfo.prop) {
                this.sortField = sortInfo.prop;
                this.sortOrder = sortInfo.order.startsWith('desc') ? 'desc' : 'asc';
            } else {
                this.sortField = '';
                this.sortOrder = '';
            }
            this.pageIndex = 1;
        },
        handleSizeChange (newPageSize) {
            this.pageSize = newPageSize;
            this.pageIndex = 1;
        },
        handleSelectionChange (section) {
            this.multipleSelection = section;
        },
        getListInfo () {
            const params = {};
            // 有filters 要拿到filters的formData，所以需要等到filters组件实例化完成
            // 有时filters组件虽然实例化了，但是formData数据为空，需要等待formData对应数据形成
            // console.log(this.$refs.filters,!this.$refs.filters || this.$refs.filters.formData )
            if (this.filters.length && ((!this.$refs.filters) || (Object.keys(this.$refs.filters.formData).length === 0)
            )) {
                // 这里之所以用setTimeout而不是$nextTick
                // 是因为$nextTick会优先尝试使用Promise
                // 当getListInfo作为microTask的一个任务时
                // 会向同一个microTask push新任务
                // 而挂载子组件到$refs上是作为macroTask的任务
                // 于是会死循环
                setTimeout(() => {
                    this.getListInfo();
                }, 0);
                return;
            }

            if (this.filters.length) {
                Object.assign(params, this.$refs.filters.formData);
            }

            if (this.paginated) {
                params[this.pageIndexReqName] = this.pageIndex;
                params[this.pageSizeReqName] = this.pageSize;
            }

            params[this.sortFieldReqName] = this.sortField;
            params[this.sortOrderReqName] = this.sortOrder;

            console.log(params);

            return new Promise((resolve) => {
                this.listRequest(resolve, this.transformRequestData(params));
            }).then((rst) => {
                const {
                    data, total, fieldList,
                } = rst;
                let promise = this.transformListData(data);
                if (!(promise instanceof Promise)) {
                    promise = Promise.resolve(promise);
                }

                promise.then((data) => {
                    this.fieldList = Object.freeze(fieldList);
                    this.total = total;
                    this.data = deepFreeze(data);
                });
            }).catch(logError);
        },
        setOperatorWidth (width) {
            if (width > this.operatorMinWidth) {
                this.operatorMinWidth = width;
            }
        },
    },
};
</script>
