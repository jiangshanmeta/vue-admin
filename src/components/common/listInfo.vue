<template>
    <section v-if="Object.keys(field_list).length && (!hasAsyncComponent || isComponentsLoaded)">
        <filters
            :filters="filters"
            @search="getListInfo"
            ref="filters"
        >
            <template slot-scope="scope" >
                <slot name="filters" :formData="scope.formData"></slot>
            </template>
        </filters>
        <slot name="afterFilters"></slot>
        <el-table
            v-if="fields.length && data.length"
            :data="data"
            style="width:100%;"
            @sort-change="handleSortChange"
        >
            <el-table-column
                v-for="field in fields"
                v-if="field_list[field]"
                :key="field"
                :label="field_list[field]['label']"
                :prop="field"
                :sortable="sortFields.includes(field)?'custom':false"
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
                    <div class="operator-container">
                        <operators
                            :field_list="field_list"
                            :operators="operators"
                            :data="scope.row"
                            :index="scope.$index"
                            @update="getListInfo"
                        ></operators>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageIndex"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="display:table;margin-left:auto;margin-right:auto;"
            v-if="data.length"
        ></el-pagination>
    </section>
</template>

<script>
import filters from "@/editor/filters.vue"
import operators from "@/components/common/operators.vue"


import dynamicImportComponent from "@/mixins/common/dynamicImportComponent.js"
import mergeAttrsConfig from "@/mixins/common/mergeAttrsConfig.js"
import {getListInfo} from "@/server/common.js"
import {noop} from "@/helpers/utility.js"

export default{
    mixins:[
        dynamicImportComponent,
        mergeAttrsConfig,
    ],
    components:{
        filters,
        operators,
    },
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
        field_list:{
            type:Object,
            required:true,
        },
        filters:{
            type:Array,
            default:function(){
                return [];
            },
        },
        sortFields:{
            type:Array,
            default:function(){
                return [];
            }
        },
        baseUrl:{
            type:String,
            default:""
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
        },
        treatData:{
            type:Function,
            default:async (data)=>{
                return data
            }
        },
        operators:{
            type:Array,
            default:function(){
                return [];
            }
        },
        pageSize:{
            type:Number,
            default:20
        },
        pageSizes:{
            type:Array,
            default:function(){
                return [10,20,30,40];
            }
        },
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
            let params = {};
            // 有filters 要拿到filters的formData，所以需要等到filters组件实例化完成
            // 有时filters组件虽然实例化了，但是formData数据为空，需要等待formData对应数据形成
            // console.log(this.$refs.filters,!this.$refs.filters || this.$refs.filters.formData )
            if(this.filters.length && ( (!this.$refs.filters) || (Object.keys(this.$refs.filters.formData).length === 0)
             )   ){


                // 这里之所以用setTimeout而不是$nextTick
                // 是因为$nextTick会优先尝试使用Promise
                // 当getListInfo作为microTask的一个任务时
                // 会向同一个microTask push新任务
                // 而挂载子组件到$refs上是作为macroTask的任务
                // 于是会死循环
                setTimeout(()=>{
                    this.getListInfo();
                },0)
                return;

            }

            if(this.filters.length){
                params = Object.assign(params,this.$refs.filters.formData)
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
        reset(){
            this.fields = [];
            this.total = 0;
            this.data = [];
            this.pageIndex = 1;
            this.sortField = '';
            this.sortOrder = '';
            this.isComponentsLoaded = false;
        }
    },
    watch:{
        field_list(){
            this.reset();
            this.importshowComponent();
            this.getListInfo();
        },
    },


}
</script>

<style scoped>
.operator-container{
    white-space: nowrap;
}
</style>