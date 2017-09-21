<template>
<section>
    <create
        :field_list="field_list"
        :create_link="create_link"
        :docreate_link="docreate_link"
    ></create>

    <filters
        :filters="filters"
        @search="handleFilterSearch"
        ref="filters"
    ></filters>

    <list-info
        :baseUrl="baseUrl"
        :pageSize="pageSize"
        :sortFields="sortFields"
        :field_list="field_list"
        :filters="filters"
        :treatData="treatData"
        ref="listInfo"
    >
        <template scope="scope">
            {{scope.index}}
        </template>
    </list-info>


<!--     <el-table
        v-if="data.length"
        :data="data"
        style="width:100%;"
        @sort-change="handleSortChange"
    >
        <el-table-column
            v-for="field in fields"
            :key="field"
            :label="field_list[field]['label']"
            :prop="field"
            :sortable="sortFields.includes[field]?'custom':false"
        ></el-table-column>
        <el-table-column
            label="操作"
            v-if="data.length"
        >
            <template scope="scope">
                操作 TODO
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="display:table;margin-left:auto;margin-right:auto;"
        v-if="data.length"
    ></el-pagination> -->

    <router-link to="/crm/index">user</router-link>

    <router-link to="/book/index">book</router-link>
</section>
</template>

<script>
import create from "@/components/common/create.vue"
import create_mixin from "@/mixins/common/create.js"

import filters from "@/editor/filters.vue"
import filters_mixin from "@/mixins/common/filters"

import listInfo from "@/components/common/listInfo.vue"
import listInfo_mixin from "@/mixins/common/listInfo.js"

export default{
    components:{
        create,
        filters,
        listInfo,
    },
    mixins:[
        create_mixin,
        filters_mixin,
        listInfo_mixin,
    ],
    data(){
        return {

        }

    },
    computed:{

    },
    methods:{
        init(){
            this.reset_create();
            this.reset_filters();
            this.reset_listInfo();
        },
        handleFilterSearch(){
            this.$refs.listInfo.getListInfo();
        },
    },
    beforeRouteEnter(to, from, next){
        console.log(to)
        next((vm)=>{
            vm.init();
            if(to.meta && to.meta.model){
                import("@/models/" + to.meta.model + ".js").then((rst)=>{
                    vm.init_create(rst.default);
                    vm.init_filters(rst.default);
                    vm.init_listInfo(rst.default);

                })
            }
        })
    },
}

</script>