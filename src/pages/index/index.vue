<template>
<section>
    <filters :filters="filter"  @search="searchByFilter" ref="filters"></filters>
    {{sort}}
        <el-table
            :data="data"
            style="width:100%;"
            @sort-change="searchBySort"
        >
            <el-table-column label="序号" v-if="data.length">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column
                v-for="item in fields"
                :key="item.field"
                :prop="item.field"
                :label="item.label"
                sortable="custom"
                
            >
            </el-table-column>
            <el-table-column label="操作" v-if="data.length">
                <template scope="scope">
                  {{scope.row._id}} 
                </template>
            </el-table-column>
        </el-table>



    <el-pagination
        layout="prev,pager,next"
        :page-size="pagesize"
        :current-page.sync="currentPage"
        :total="total"
        @current-change="searchByPage"
    ></el-pagination>
</section>

</template>

<script>
import filters from "@/editor/filters"
export default{
    data(){
        return {
            base_url:'',
            filter:[],
            pagesize:20,
            total:100,
            currentPage:1,
            data:[],
            fields:[],
            sort:'',
        }
    },
    components:{
       filters 
    },
    methods:{
        searchBySort(obj){
            console.log(obj)
            let data = this.$refs.filters.getData();
            let sort = obj['order'][0] + obj['prop'];
            this.sort = sort;

            data['sort'] = sort;
            data['page'] = this.currentPage;
            this.realSearch(data);
        },
        searchByFilter(data){
            this.realSearch(data).then(()=>{
                this.currentPage = 1;
            })
        },
        searchByPage(currentPage){
            let data = this.$refs.filters.getData();
            data['page'] = currentPage;
            if(this.sort){
                data['sort'] = this.sort;
            }
            this.realSearch(data)
        },
        realSearch(params={}){
            return this.$axios.get(this.base_url,{params:params}).then((json)=>{
                let rst = json.data;

                if(rst.pagesize){
                    this.pagesize = rst.pagesize;
                }

                if(rst.filter){
                    this.filter = rst.filter;
                }

                if(rst.total){
                    this.total = rst.total;
                }

                if(rst.fields){
                    this.fields = rst.fields;
                }

                if(rst.data){
                    this.data = rst.data;
                }

            })
        },
        init(){
            let meta = this.$route.meta;
            let base_url = meta && meta.base_url;
            if(!base_url){
                this.$message('请填写base_url');
                return;
            }
            this.base_url = base_url;
            this.data = [];
            this.filter = [];
            this.fields = [];
            this.total = 0;
            this.pagesize = 0;
            this.currentPage = 1;

            setTimeout(()=>{
                console.log(111222)
                this.realSearch()
            },3000)
            // this.realSearch();
            console.log(base_url);

        },
        pagechange(currentPage){
            console.log(currentPage)
        }
    },
    created(){
        // console.log("aaaaa");

        // setTimeout(()=>{

        //     this.filter = [
        //         {editor:'field_bool',value:1,label:'是否',field:'boolField'},
        //         {editor:'field_month',value:'',label:'月份',field:'beginTS'},
        //         {editor:'field_day',value:'',label:'日期',field:'endTS'},
        //         {editor:'field_enum',value:3,label:'enum',field:'enumField',candidate:[
        //             {label:'111',value:1},
        //             {label:'222',value:2},
        //             {label:'333',value:3},
        //             {label:'444',value:4},
        //             {label:'555',value:5},
        //         ]}
        //     ]
        // },3000)
    },
    beforeRouteEnter (to, from, next){
        // console.log(1111111)
        next((vm)=>{
            // console.log(vm.$route)
            vm.init();
        })
    }
}
</script>

<style >
/*.el-table table{
    width:100% !important;
    max-width:100%;
}*/
</style>