<template>
<section>
    <filters :filters="filter"  @search="searchByFilter" ref="filters"></filters>
    {{currentPage}}
    <el-table
        :data="data"

    >
        <el-table-column
            v-for="item in fields"
            :key="item.field"
            :prop="item.field"
            :label="item.label"
        >
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
        }
    },
    components:{
       filters 
    },
    methods:{
        searchByFilter(data){
            // data['page'] = this.currentPage;
            this.realSearch(data).then(()=>{
                this.currentPage = 1;
            })
        },
        searchByPage(currentPage){
            let data = this.$refs.filters.getData();
            data['page'] = currentPage;
            this.realSearch(data)
        },
        realSearch(params={}){
            return this.$axios.get(this.base_url,{params:params}).then((json)=>{
                let rst = json.rst;

                if(rst.base_url){
                    this.filter = rst.base_url;
                }

                if(rst.pagesize){
                    this.pagesize = rst.pagesize;
                }

                if(rst.filter){
                    this.filter = rst.filter;
                }

                if(rst.total){
                    this.total = total;
                }

                if(rst.fields){
                    this.fields = rst.fields;
                }

                if(rst.data){
                    this.data = rst.data;
                }
                // 写data
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
            console.log(base_url);

        },
        pagechange(currentPage){
            console.log(currentPage)
        }
    },
    created(){
        // console.log("aaaaa");

        setTimeout(()=>{

            this.filter = [
                {editor:'field_bool',value:1,label:'是否',field:'boolField'},
                {editor:'field_month',value:'',label:'月份',field:'beginTS'},
                {editor:'field_day',value:'',label:'日期',field:'endTS'},
                {editor:'field_enum',value:3,label:'enum',field:'enumField',candidate:[
                    {label:'111',value:1},
                    {label:'222',value:2},
                    {label:'333',value:3},
                    {label:'444',value:4},
                    {label:'555',value:5},
                ]}
            ]
        },3000)
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