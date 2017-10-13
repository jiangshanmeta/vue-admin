<template>
    <section v-if="!hasAsyncComponent || isComponentsLoaded">
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
            >
                <template scope="scope" >
                    
                    <template v-if="!field_list[field].showcomponent">
                        {{scope.row[field]}}
                    </template>
                    <component 
                        v-else
                        :is="field_list[field]['showcomponent']['component']"
                        :data="scope.row[field]"
                        :config="field_list[field]['showcomponent']['config']"
                    >
                    </component>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                v-if="data.length"
                :min-width="200"
            >
                <template scope="scope">
                    <slot :data="scope.row" :index="scope.$index"></slot>
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
    </section>
</template>

<script>
import dynamicImportComponent from "@/mixins/common/dynamicImportComponent.js"
export default{
    mixins:[dynamicImportComponent],
    data(){
        return {
            data:[],
            pageIndex:1,
            sortField:'',
            sortOrder:'',
            total:0,
            fields:[],
            isComponentsLoaded:false,
        }
    },
    props:{
        baseUrl:{
            type:String,
            required:true,
        },
        pageSize:{
            type:Number,
            default:20
        },
        sortFields:{
            type:Array,
            default:function(){
                return [];
            }
        },
        field_list:{
            type:Object,
            required:true,
        },
        filters:{
            type:Array,
            required:true,
        },
        treatData:{
            type:Function,
            default:async (data)=>{
                return data
            }
        },
        filtersname:{
            type:String,
            default:"filters",
        }
    },
    computed:{
        hasAsyncComponent(){
            let keys = Object.keys(this.field_list);
            for(let item of keys){
                if(this.field_list[item]['showcomponent']){
                    return true;
                }
            }
            return false;
        },
    },
    methods:{
        importShowComponent(){
            if(this.hasAsyncComponent){
                let keys = Object.keys(this.field_list);
                let components = [];
                for(let item of keys){
                    if(this.field_list[item]['showcomponent']){
                        components.push(this.field_list[item]['showcomponent']['path']);
                    }
                }

                this.dynamicImportComponent(components).then(()=>{
                    this.isComponentsLoaded = true;
                })
            }
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
        handleCurrentChange(){
            this.getListInfo();
        },
        handleSizeChange(newPageSize){
            this.pageSize = newPageSize;
            this.getListInfo();
        },
        getListInfo(){
            if(!this.baseUrl){
                return new Promise((resolve,reject)=>{

                });
            }


            let params = {};
            if(this.filters.length && this.$parent.$refs[this.filtersname] ){
                params = Object.assign(params,this.$parent.$refs[this.filtersname].formData);
            }

            params['pageIndex'] = this.pageIndex;
            params['pageSize'] = this.pageSize;
            params['sortField'] = this.sortField;
            params['sortOrder'] = this.sortOrder;

            return this.$axios.get(this.baseUrl,{params}).then((json)=>{
                let {data,total,fields} = json.data;

                let promise = this.treatData(data);
                if(!(promise instanceof Promise)){
                    promise = Promise.resolve(promise);
                }

                promise.then((data)=>{
                    this.fields = fields;
                    this.total = total;
                    this.data = data;
                });
            });
        },
    },
    watch:{
        baseUrl(newBaseUrl){
            this.fields = [];
            this.total = 0;
            this.data = [];
            this.isComponentsLoaded = false;
            this.importShowComponent();

            if(newBaseUrl){
                // 保证如果有filters，filters得到实例化
                this.$nextTick(()=>{
                    this.getListInfo();
                })
            }
        }
    },


}
</script>