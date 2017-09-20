<template>
    <section>
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
let fns = {
    async treatData(data){
        return data;
    }
}
export default{
    data(){
        return {
            data:[],
            pageIndex:1,
            // pageSize:20,
            sortField:'',
            sortOrder:'',
            // sortFields:[],
            // baseUrl:'',
            total:0,
            isMounted:false,
            isModelLoaded:false,
            fields:[]
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
        }
    },
    methods:{
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
        // handleFilterSearch(){
        //     this.getListInfo();
        // },
        handleCurrentChange(){
            this.getListInfo();
        },
        handleSizeChange(newPageSize){
            this.pageSize = newPageSize;
            this.getListInfo();
        },
        getListInfo(){
            // console.log(this.$parent);
            // return;
            // console.log(this.baseUrl,this.baseUrl,this.$parent.$refs.filters)
            if(!this.baseUrl){
                return new Promise((resolve,reject)=>{

                });
            }
            // || ( this.filters.length  &&  !this.$parent.$refs.filters)   
            // 保证带上筛选
            // if(Object.keys(this.$parent.$refs.filters.formData).length<this.$parent.filters.length){
            //     return this.$nextTick(()=>{
            //         return this.getListInfo()
            //     })
            // }

            let params = {};
            if(this.filters.length){
                params = Object.assign(params,this.$parent.$refs.filters.formData);
            }


            // let params = Object.assign({},this.$parent.$refs.filters.formData);
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
    watch:{
        baseUrl(newBaseUrl){
            if(newBaseUrl){
                // 保证如果有filters，filters得到实例化
                this.$nextTick(()=>{
                    this.getListInfo();
                })
            }
            // newBaseUrl && 
        }
    },

    // mounted(){
        
    //     this.$nextTick(()=>{
    //         this.isMounted = true;
    //         if(this.isModelLoaded){
    //             this.getListInfo();
    //         }
    //     })
    // }


}
</script>