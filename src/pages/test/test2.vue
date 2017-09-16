<template>
<section>
    <filter_enum
        labelfield="name"
        valuefield="id"
        allvalue="all"
        alllabel="不限"
        v-model="filter_enum"
        :candidate="filter_enum_candidate"
    >

        
    </filter_enum>
        {{filter_enum}}

    <filter_async_enum
        v-model="filter_async_enum"
        uri="/test/field_async_enum_select"
        :allvalue="-1"
        alllabel="不限"
    ></filter_async_enum>
    {{filter_async_enum}}


    <filters
        :filters="filters"
        @search="doSearch"
    ></filters>

</section>
</template>

<script>
import filter_enum from "@/editor/filter_enum"
import filter_async_enum from "@/editor/filter_async_enum"

import filters from "@/editor/filters.vue"
export default{
    components:{
        filter_enum,
        filter_async_enum,
        filters,
    },
    data(){
        return {
            filter_enum:'all',
            filter_enum_candidate:[
                {id:4,name:'value1'},
                {id:5,name:'value2'},
                {id:6,name:'value3'},

            ],
            filter_async_enum:-1,

            filters:[],
            filtersData:[
                {
                    label:"开始时间",
                    field:'startTs',
                    editor:'field_day',
                    default:function(){
                        return '2017-08-15';
                    },
                    // value:'',
                },
                {
                    label:'结束月份',
                    field:'endTs',
                    editor:'field_month',
                    default:function(){
                        return '2017-06'
                    },
                    // value:'',
                },
                {
                    label:"类型",
                    field:"typ",
                    editor:'filter_async_enum',
                    uri:'/test/field_async_enum_select',
                    allvalue:-1,
                    alllabel:"不限",
                    default:-1,
                    // value:'',
                },
                {
                    label:"状态",
                    field:'status',
                    editor:'filter_enum',
                    candidate:[
                        {id:3,name:'未启用'},
                        {id:9,name:'使用中'},
                        {id:15,name:'已结束'}
                    ],
                    valuefield:'id',
                    labelfield:'name',
                    default:"all",
                    alllabel:"全部",
                    allvalue:"all",
                    // value:''
                },
                {
                    label:"搜索",
                    field:"search",
                    editor:"field_model",
                    candidate:[
                        {id:9,name:"张三"},
                        {id:10,name:"张四"},
                        {id:11,name:"李四"},
                        {id:12,name:"李五"},
                        {id:13,name:"王五"},
                    ],
                    valuefield:'id',
                    labelfield:'name'
                }

            ],
        }
    },
    methods:{
        doSearch(params){
            console.log(params);
        }
    },
    created(){
        setTimeout(()=>{
            this.filters = this.filtersData;
        },3000)
    }
}
</script>