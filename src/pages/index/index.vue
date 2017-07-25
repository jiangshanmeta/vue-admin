<template>
<section>
    <filters :filters="filter"  @search="searchByFilter" ref="filters"></filters>

    <create 
        :create_link="create_link" 
        :docreate_link="docreate_link"
        ref="create"
        @create="fullSearch"
    ></create>

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
                <span @click="showEditBox(scope.row._id)">编辑<i class="el-icon-edit"></i></span>
                <operators 
                    :id="scope.row._id" 
                    :operators="operators"
                    @update="fullSearch"
                ></operators>
            </template>
        </el-table-column>
    </el-table>

    <edit
        :edit_link="edit_link"
        :doedit_link="doedit_link"
        ref="edit"
        @update="fullSearch"
    ></edit>

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
import operators from "@/components/common/operators"

import create from "@/components/common/create"
import edit from "@/components/common/edit"

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
            create_link:'',
            docreate_link:'',

            detail_link:'',
            edit_link:'',
            doedit_link:'',
            // edit_fields:[],
            operators:[],

            // curEditId:'',
            // isShowCreatebox:false,
            // isShowEditbox:false,
        }
    },
    components:{
       filters,
       operators,
       create,
       edit,
    },
    methods:{
        showEditBox(id){
            // this.curEditId = id;
            // console.log(id);
            // return
            this.$refs.edit.show(id)
        },

        fullSearch(){
            let data = this.$refs.filters.getData();
            data['page'] = this.currentPage;
            if(this.sort){
                data['sort'] = this.sort;
            }
            return this.realSearch(data);
        },
        searchBySort(obj){
            let sort = obj['order'][0] + obj['prop'];
            this.sort = sort;
            this.fullSearch();
        },
        searchByFilter(data){
            this.realSearch(data).then(()=>{
                this.currentPage = 1;
            })
        },
        searchByPage(currentPage){
            this.fullSearch();
        },
        realSearch(params={}){
            return this.$axios.get(this.base_url,{params:params}).then((json)=>{
                let rst = json.data;
                let backendFields = [
                    'pagesize',
                    'filter',
                    'total',
                    'fields',
                    'data',
                    'create_link',
                    'docreate_link',
                    'detail_link',
                    'edit_link',
                    'doedit_link',
                    'operators',
                ];
                backendFields.forEach(function(item){
                    if(rst[item]){
                        this[item] = rst[item];
                    }
                },this);

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
            this.sort = '';
            this.create_link = '';
            this.docreate_link = '';
            this.detail_link = '';
            this.edit_link = '';
            this.doedit_link = '';
            this.operators = [];
            this.curEditId = '';
            this.$refs.create.init();
            this.$refs.edit.init();
            // this.create_fields = [];
            // this.edit_fields = [];

            this.realSearch();
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