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
                <template slot-scope="scope" >
                    <template v-if="!field_list[field].showComponent">
                        {{scope.row[field]}}
                    </template>
                    <component 
                        v-else
                        :is="field_list[field]['showComponent']['name']"
                        :data="scope.row[field]"
                        v-bind="mergeAttrsConfig(field_list[field]['showComponent']['config'])"
                        
                    >
                    </component>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                v-if="data.length"
                :min-width="200"
            >
                <template slot-scope="scope">
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
import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import {getListInfo} from "@/server/common.js"
import {noop} from "@/helpers/utility.js"
export default{
    mixins:[
        dynamicImportComponent,
        mergeAttrsConfig,
    ],
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
        },
        listRequest:{
            type:Function,
            default:getListInfo,
        },
        pageIndexReqName:{
            type:String,
            default:"pageIndex",
        },
        pageSizeReqName:{
            type:String,
            default:"pageSize",
        },
        sortFieldReqName:{
            type:String,
            default:"sortField",
        },
        sortOrderReqName:{
            type:String,
            default:"sortOrder",
        }
    },
    computed:{
        hasAsyncComponent(){
            let keys = Object.keys(this.field_list);
            for(let item of keys){
                if(this.field_list[item]['showComponent']){
                    return true;
                }
            }
            return false;
        },
    },
    methods:{
        importshowComponent(){
            if(this.hasAsyncComponent){
                let keys = Object.keys(this.field_list);
                let components = [];
                for(let item of keys){
                    if(this.field_list[item]['showComponent']){
                        components.push(this.field_list[item]['showComponent']['path']);
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

            params[this.pageIndexReqName] = this.pageIndex;
            params[this.pageSizeReqName] = this.pageSize;
            params[this.sortFieldReqName] = this.sortField;
            params[this.sortOrderReqName] = this.sortOrder;

            return new Promise((resolve,reject)=>{
                this.listRequest(this,params,resolve)
            }).then((rst)=>{
                let {data,total,fields} = rst;
                let promise = this.treatData(data);
                if(!(promise instanceof Promise)){
                    promise = Promise.resolve(promise);
                }

                promise.then((data)=>{
                    this.fields = fields;
                    this.total = total;
                    this.data = data;
                });
            }).catch(noop);

        },
    },
    watch:{
        baseUrl(newBaseUrl){
            this.fields = [];
            this.total = 0;
            this.data = [];
            this.isComponentsLoaded = false;
            this.importshowComponent();

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