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
    ></filters>

    <el-table
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


    <router-link to="/crm/index">user</router-link>

    <router-link to="/book/index">book</router-link>
</section>
</template>

<script>
import create from "@/components/common/create.vue"
import create_mixin from "@/mixins/common/create.js"

import filters from "@/editor/filters.vue"
import filters_mixin from "@/mixins/common/filters"

export default{
    components:{
        create,
        filters,
    },
    mixins:[
        create_mixin,
        filters_mixin,
    ],
    data(){
        return {
            data:[],
            pageIndex:1,
            pageSize:20,
            sortField:'',
            sortOrder:'',
            sortFields:[],
            baseUrl:'',
            total:0,
        }

    },
    computed:{

    },
    methods:{
        init(){
            this.reset_create();
            this.reset_filters();
        },
        handleSortChange(sortInfo){
            if(sortInfo.prop){
                this.sortField = sortInfo.prop;
                this.sortOrder = sortInfo.order.startsWith('desc')?'desc':'asc';
            }else{
                this.sortField = '';
                this.sortOrder = '';
            }
            // console.log(sortInfo)

            this.pageIndex = 1;
            this.getListInfo();
        },
        handleFilterSearch(){
            this.getListInfo();
        },
        getListInfo(){
            if(!this.baseUrl){
                return new Promise();
            }
            let params = {};
            if(this.$refs.filters){
                params = Object.assign(params,this.$refs.filters.formData);
            }

            params['pageIndex'] = this.pageIndex;
            params['pageSize'] = this.pageSize;
            params['sortField'] = this.sortField;
            params['sortOrder'] = this.sortOrder;

            return this.$axios.get(this.baseUrl,{params}).then((json)=>{
                let {data,total,fields} = json.data;

                this.treatData(data).then((data)=>{
                    this.fields = fields;
                    this.total = total;
                    this.data = data;
                });

                
                
            });
        },
        async treatData(data){
            return data;
        }
    },
    beforeRouteEnter(to, from, next){
        console.log(to)
        next((vm)=>{
            vm.init();
            if(to.meta && to.meta.model){
                import("@/models/" + to.meta.model + ".js").then((rst)=>{
                    vm.init_create(rst.default);
                    vm.init_filters(rst.default);
                    if(rst.default.treatData && typeof rst.default.treatData === 'function'){
                        vm.treatData = rst.default.treatData.bind(vm);
                    }

                    let {pageSize=20,pageIndex=1,sortFields=[],baseUrl=''} = rst.default;
                    vm.pageSize = pageSize;
                    vm.pageIndex = pageIndex;
                    vm.sortFields = sortFields;
                    vm.baseUrl = baseUrl; 
                    vm.getListInfo()


                })
            }
        })
    }
}

</script>