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
    ></el-pagination>

    <router-link to="/crm/index">user</router-link>

    <router-link to="/book/index">book</router-link>
</section>
</template>

<script>
import create from "@/components/common/create.vue"
import create_mixin from "@/mixins/common/create.js"

import filters from "@/editor/filters.vue"
import filters_mixin from "@/mixins/common/filters"

let fns = {
    async treatData(data){
        return data;
    }
}

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
            isMounted:false,
            isModelLoaded:false,
        }

    },
    computed:{

    },
    methods:{
        init(){
            this.reset_create();
            this.reset_filters();
            this.data = [];
            this.pageSize = 20;
            this.pageIndex = 1;
            this.total = 0;
            this.sortFields = [];
            this.sortField = '';
            this.sortOrder = '';
            this.baseUrl = '';
            this.isModelLoaded = false;
        },
        handleSortChange(sortInfo){
            if(sortInfo.prop){
                this.sortField = sortInfo.prop;
                this.sortOrder = sortInfo.order.startsWith('desc')?'desc':'asc';
            }else{
                this.sortField = '';
                this.sortOrder = '';
            }
            this.pageIndex = 1;
            this.getListInfo();
        },
        handleFilterSearch(){
            this.getListInfo();
        },
        handleCurrentChange(){
            this.getListInfo();
        },
        handleSizeChange(newPageSize){
            this.pageSize = newPageSize;
            this.getListInfo();
        },
        getListInfo(){
            if(!this.baseUrl || !this.$refs.filters){
                return new Promise((resolve,reject)=>{

                });
            }
            
            // 保证带上筛选
            if(Object.keys(this.$refs.filters.formData).length<this.filters.length){
                return this.$nextTick(()=>{
                    return this.getListInfo()
                })
            }

            let params = Object.assign({},this.$refs.filters.formData);
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
                    }else{
                        vm.treatData = fns.treatData.bind(vm);
                    }


                    let {pageSize=20,pageIndex=1,sortFields=[],baseUrl=''} = rst.default;
                    vm.pageSize = pageSize;
                    vm.pageIndex = pageIndex;
                    vm.sortFields = sortFields;
                    vm.baseUrl = baseUrl;
                    vm.isModelLoaded = true;
                    if(vm.isMounted){
                        vm.getListInfo()
                    }
                    


                })
            }
        })
    },
    mounted(){
        
        this.$nextTick(()=>{
            this.isMounted = true;
            if(this.isModelLoaded){
                this.getListInfo();
            }
        })
    }
}

</script>